/**
 * Length of the longest overlap between the (whitespace-trimmed) suffix of `a`
 * and the prefix of `b`, compared case-insensitively. Used to merge an accepted
 * posology suggestion onto the text already typed.
 */
export const suffixPrefixOverlap = (a: string, b: string): number => {
  const aTrim = a.replace(/\s+$/, '')
  const max = Math.min(aTrim.length, b.length)
  for (let k = max; k > 0; k--) {
    if (aTrim.slice(-k).toLowerCase() === b.slice(0, k).toLowerCase()) return k
  }
  return 0
}

export const findCommonSequence = (str1: string, str2: string) => {
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
