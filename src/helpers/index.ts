import { Medication } from '@icure/be-fhc-lite-api'
import type { PharmacistVisibility, PractitionerVisibility } from '../types'

function findCommonSequence(str1: string, str2: string) {
  let commonSequence = ''

  // Determine the maximum possible overlap
  const maxOverlap = Math.min(str1.length, str2.length)

  for (let i = 1; i <= maxOverlap; i++) {
    // Get the suffix of str1 and prefix of str2
    const suffix = str1.slice(-i)
    const prefix = str2.slice(0, i)

    if (suffix === prefix) {
      commonSequence = suffix // Update the common sequence
    }
  }

  return commonSequence
}

interface NamedItem {
  title: string
}

/**
 * FetchMissingCallback:
 *   fetchMissing(fromName, toName?) => Promise<NamedItem[]>
 *
 * fromName is the last item name we successfully placed into the result.
 * toName is the upper boundary (excluded). If undefined, it means "fetch anything above fromName".
 */
export type FetchMissingCallback = (fromName: string, toName?: string) => Promise<NamedItem[]>

/**
 * Merge an arbitrary number of partially available, sorted arrays of NamedItem.
 * Each array has its own "fetch missing" callback.
 */
export async function mergeSortedPartialArraysN(limit: number, arrays: NamedItem[][], fetchMissingCallbacks: FetchMissingCallback[]): Promise<[NamedItem[], number[]]> {
  if (arrays.length !== fetchMissingCallbacks.length) {
    throw new Error('Each array must have a corresponding fetch callback.')
  }

  const result: NamedItem[] = []

  // Pointers to the current position in each array
  const pointers = arrays.map(() => 0)

  // Track the name of the last item we appended to `result`.
  let lastPushedName = ''

  /**
   * Drain one array (the k-th array) of all items whose name is strictly < limitName.
   * If that array is exhausted, call its fetch callback to see if there are more items
   * in the range (lastPushedName, limitName).
   *
   * - If limitName === null, drain everything available from that array (and fetch if needed),
   *   i.e. there is no upper boundary.
   */
  async function drainArrayUpTo(k: number, limitName: string | null, limit: number): Promise<void> {
    const arr = arrays[k]
    let p = pointers[k]
    const fetchMissing = fetchMissingCallbacks[k]

    while (result.length < limit) {
      if (p < arr.length) {
        const itemName = arr[p].title.toLowerCase()
        // We only push if itemName < limitName (when limitName != null).
        // If limitName is null, we push all remaining items.
        if (limitName === null || itemName < limitName) {
          // Push this item to the result
          result.push(arr[p])
          lastPushedName = itemName
          p++
        } else {
          // The next item is >= limitName, so stop draining here.
          break
        }
      } else {
        // We've exhausted arr[k] at pointer p. Let's try fetching from the callback
        const upper = limitName === null ? undefined : limitName
        const newItems = await fetchMissing(lastPushedName, upper)

        if (newItems.length === 0) {
          // No new items in the requested range, so we can't drain more
          break
        }
        // Insert the newly fetched items at the current pointer location
        // They should already be sorted by .name.toLowerCase according to the contract
        arr.splice(p, 0, ...newItems)
      }
    }

    // Update the pointer after draining
    pointers[k] = p
  }

  /**
   * Returns the index of the array whose "front item" (the item at pointers[k])
   * has the smallest name. Returns null if all arrays are exhausted (no front item).
   */
  function indexOfSmallestFront(): number | null {
    let smallestIndex: number | null = null
    let smallestName = ''

    for (let k = 0; k < arrays.length; k++) {
      const p = pointers[k]
      if (p < arrays[k].length) {
        const candidateName = arrays[k][p].title.toLowerCase()
        if (smallestIndex === null || candidateName < smallestName) {
          smallestIndex = k
          smallestName = candidateName
        }
      }
    }
    return smallestIndex
  }

  // Main loop: as long as there's at least one array with a "next item",
  // pick the smallest front item and place it in the result, draining
  // other arrays in case they might have items that come before that smallest item.
  while (result.length < limit) {
    const si = indexOfSmallestFront() // index of array with smallest front item
    if (si === null) {
      // No more items in any array
      break
    }
    // The next item we plan to place
    const nextName = arrays[si][pointers[si]].title.toLowerCase()

    // Drain all other arrays up to nextName
    for (let k = 0; k < arrays.length; k++) {
      // We only want items strictly less than nextName
      await drainArrayUpTo(k, nextName, limit)
    }

    if (result.length < limit) {
      // Now the item at arrays[si][pointers[si]] should be exactly nextName
      // (unless it got drained, so we check bounds again).
      if (pointers[si] < arrays[si].length) {
        // Place that smallest item
        const item = arrays[si][pointers[si]]
        if (item.title.toLowerCase() === nextName) {
          result.push(item)
          lastPushedName = nextName
          pointers[si]++
        }
      }
    }
  }

  // Finally, drain everything left (limitName = null)
  if (result.length < limit) {
    for (let k = 0; k < arrays.length; k++) {
      await drainArrayUpTo(k, null, limit)
    }
  }
  return [result, pointers]
}

const durationTimeUnits = [
  {
    value: '1',
    label: 'jour',
  },
  {
    value: '7',
    label: 'semaine',
  },
]
const periodicityTimeUnits = [
  {
    value: '0',
    label: 'aucune',
  },
  {
    value: '7',
    label: 'semaine',
  },
  {
    value: '14',
    label: '2 semaines',
  },
  {
    value: '21',
    label: '3 semaines',
  },
  {
    value: '1',
    label: 'x nombre de jours',
  },
]

export type PrescriberVisibilityOption = {
  value: PractitionerVisibility
  label: string
}
const practitionerVisibilityOptions: PrescriberVisibilityOption[] = [
  {
    value: 'open',
    label: 'Visible pour tous les prescripteurs',
  },
  {
    value: 'locked',
    label: 'Visible uniquement pour moi-même',
  },
  {
    value: 'gmd_prescriber',
    label: 'Visible uniquement pour le titulaire du DMG',
  },
]

export type PharmacistVisibilityOption = {
  value: PharmacistVisibility
  label: string
}
const pharmacistVisibilityOptions: PharmacistVisibilityOption[] = [
  {
    value: 'NULL',
    label: 'Le médicament est visible par tous les pharmaciens',
  },
  {
    value: 'locked',
    label: 'Le médicament n`est pas visible par tous les pharmaciens',
  },
]

const reimbursementOptions = [
  {
    value: null,
    label: 'Aucun',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.PAYINGTHIRDPARTY,
    label: 'Tiers Payant',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.FIRSTDOSE,
    label: 'Première Dose',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.SECONDDOSE,
    label: 'Deuxième Dose',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.THIRDDOSE,
    label: 'Troisième Dose',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.CHRONICKINDEYDISEASE,
    label: 'Maladie Rénale Chronique',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESTREATMENT,
    label: 'Traitement du Diabète',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESCONVENTION,
    label: 'Convention Diabète',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.NOTREIMBURSABLE,
    label: 'Non Remboursable',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.EXPLAINMEDICATION,
    label: 'Explication du Médicament',
  },
  {
    value: Medication.InstructionsForReimbursementEnum.DIABETESSTARTPATH,
    label: 'Parcours Initial Diabète',
  },
]

const deliveryModusSpecificationCodes = {
  Sp: {
    en: 'Prescription by specialist',
    fr: 'Prescription par un médecin-spécialiste',
    nl: 'Voorschrift door een geneesheer-specialist',
    de: 'Verschreibung von einem Facharzt',
  },
  Sp1: {
    en: 'First prescription by specialist, follow-up prescription by general practitioner',
    fr: 'Première prescription par un médecin-spécialiste, prescription de suivi par un médecin généraliste',
    nl: 'Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts',
    de: 'Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt',
  },
  'Sp/S': {
    en: 'Prescription by specialist',
    fr: 'Prescription par un médecin-spécialiste',
    nl: 'Voorschrift door een geneesheer-specialist',
    de: 'Verschreibung von einem Facharzt',
  },
  'Sp1/S': {
    en: 'First prescription by specialist, follow-up prescription by general practitioner',
    fr: 'Première prescription par un médecin-spécialiste, prescription de suivi par un médecin généraliste',
    nl: 'Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts',
    de: 'Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt',
  },
  'IMP/Sp': {
    en: 'Prescription by specialist',
    fr: 'Prescription par un médecin-spécialiste',
    nl: 'Voorschrift door een geneesheer-specialist',
    de: 'Verschreibung von einem Facharzt',
  },
  'IMP/Sp1': {
    en: 'First prescription by specialist, follow-up prescription by general practitioner',
    fr: 'Première prescription par un médecin-spécialiste, prescription de suivi par un médecin généraliste',
    nl: 'Eerste voorschrift door een geneesheer-specialist, vervolgoorschrift door huisarts',
    de: 'Erste Verschreibung von einem Facharzt, Folgeverordnung vom Hausarzt',
  },
}
export {
  findCommonSequence,
  durationTimeUnits,
  periodicityTimeUnits,
  practitionerVisibilityOptions,
  pharmacistVisibilityOptions,
  reimbursementOptions,
  deliveryModusSpecificationCodes,
}
