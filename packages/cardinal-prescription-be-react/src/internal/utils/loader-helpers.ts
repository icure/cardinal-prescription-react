export interface NamedItem {
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
