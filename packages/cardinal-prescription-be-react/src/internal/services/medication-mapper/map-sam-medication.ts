import { Amp, Ampp, Dmpp, Nmp, SamText, VmpGroup } from '@icure/cardinal-be-sam-sdk'
import { DeliveryModusSpecificationCodeType, MedicationType } from '../../../shared/types'
import { capitalize } from '../../utils/string-helpers'

export const defaultLanguage: keyof SamText = 'fr'

/**
 * Maps one AMP/AMPP/DMPP triple (SAM's product-level medication hierarchy) into this
 * library's normalized `MedicationType`, nesting every SAM-specific field under
 * `regulatory.be`. Pure and side-effect free — pagination/filtering/sorting stay in the
 * loader; `now` is threaded in rather than read here so every medication mapped within the
 * same page-load shares one reimbursement-validity instant, same as before extraction.
 */
export function mapSamMedication(amp: Amp, ampp: Ampp, dmpp: Dmpp | undefined, index: number, language: keyof SamText, now: number): MedicationType {
  return {
    id: ampp.ctiExtended,
    kind: 'product',
    title:
      ampp.prescriptionName?.[language] ??
      ampp.prescriptionName?.[defaultLanguage] ??
      ampp.abbreviatedName?.[language] ??
      ampp.abbreviatedName?.[defaultLanguage] ??
      amp.prescriptionName?.[language] ??
      amp.prescriptionName?.[defaultLanguage] ??
      amp.name?.[language] ??
      amp.name?.[defaultLanguage] ??
      amp.abbreviatedName?.[language] ??
      amp.abbreviatedName?.[defaultLanguage] ??
      '',
    activeIngredient: amp.vmp?.vmpGroup?.name?.[language] ?? amp.vmp?.vmpGroup?.name?.[defaultLanguage] ?? '',
    index,
    regulatory: {
      be: {
        ampId: amp.id,
        vmpGroupId: amp.vmp?.vmpGroup?.id,
        cnk: dmpp?.code,
        dmppProductId: dmpp?.productId,
        vmpTitle: amp.vmp?.name?.[language] ?? amp.vmp?.name?.[defaultLanguage] ?? '',
        price: ampp?.exFactoryPrice ? `€${ampp.exFactoryPrice}` : '',
        cheap: dmpp?.cheap,
        cheapest: dmpp?.cheapest,
        crmLink: ampp.crmLink?.[language] ?? ampp.crmLink?.[defaultLanguage],
        patientInformationLeafletLink: ampp.leafletLink?.[language] ?? ampp.leafletLink?.[defaultLanguage],
        blackTriangle: amp.blackTriangle,
        speciallyRegulated: ampp.speciallyRegulated,
        genericPrescriptionRequired: ampp.genericPrescriptionRequired,
        intendedName: ampp.prescriptionName?.[language] ?? ampp.prescriptionName?.[defaultLanguage],
        rmaProfessionalLink: ampp.rmaProfessionalLink?.[language] ?? ampp.rmaProfessionalLink?.[defaultLanguage],
        spcLink: ampp.spcLink?.[language] ?? ampp.spcLink?.[defaultLanguage],
        dhpcLink: ampp.dhpcLink?.[language] ?? ampp.dhpcLink?.[defaultLanguage],
        rmakeyMessages: ampp.rmaKeyMessages?.[language] ?? ampp.rmaKeyMessages?.[defaultLanguage],
        vmp: amp.vmp,
        supplyProblems: ampp.supplyProblems,
        commercializations: ampp?.commercializations,
        deliveryModusCode: ampp.deliveryModusCode,
        deliveryModus: ampp.deliveryModus?.[language] ?? ampp.deliveryModus?.[defaultLanguage],
        deliveryModusSpecificationCode: ampp.deliveryModusSpecificationCode as DeliveryModusSpecificationCodeType,
        deliveryModusSpecification: ampp.deliveryModusSpecification?.[language] ?? ampp.deliveryModusSpecification?.[defaultLanguage],
        reimbursements: dmpp?.reimbursements?.find((reimbursement) => reimbursement.from && reimbursement.from <= now && (!reimbursement.to || reimbursement.to > now)),
      },
    },
  } as MedicationType
}

/**
 * Maps SAM's product-level container (the AMP itself) into the title/id pair used by
 * `MedicationProductType` — pulled out alongside `mapSamMedication` since it draws on the
 * same title fallback-chain convention, even though it doesn't produce a `MedicationType`.
 */
export function mapSamMedicationProductTitle(amp: Amp, language: keyof SamText): string {
  return (
    amp.prescriptionName?.[language] ??
    amp.prescriptionName?.[defaultLanguage] ??
    amp.name?.[language] ??
    amp.name?.[defaultLanguage] ??
    amp.abbreviatedName?.[language] ??
    amp.abbreviatedName?.[defaultLanguage] ??
    ''
  )
}

/** Maps a VMP group (SAM's molecule-level medication concept) into a `MedicationType`. */
export function mapSamMolecule(vmp: VmpGroup, language: keyof SamText): MedicationType {
  return {
    id: vmp.code,
    kind: 'molecule',
    title: capitalize(vmp.name?.[language]) ?? capitalize(vmp.name?.[defaultLanguage]) ?? '',
    regulatory: {
      be: {
        vmpGroupId: vmp.id,
        vmpGroup: vmp,
      },
    },
  }
}

/** Maps an NMP (SAM's non-medicinal product concept) into a `MedicationType`. */
export function mapSamNonMedicinal(nmp: Nmp, language: keyof SamText): MedicationType {
  return {
    id: nmp.code,
    kind: 'nonMedicinal',
    title: capitalize(nmp.name?.[language]) ?? capitalize(nmp.name?.[defaultLanguage]) ?? '',
    regulatory: {
      be: {
        nmpId: nmp.id,
      },
    },
  }
}
