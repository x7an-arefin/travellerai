export function getDisplayNameInitials(name: string): string {
  if (!name) return ''
  const cleanName = name.trim()
  const parts = cleanName.split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
