export function capitalize(s?: string): string | undefined {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export function trim(s?: string): string | undefined {
  if (!s) return s
  return s.replace(/\s+/g, ' ').trim()
}
