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
