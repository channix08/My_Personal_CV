/** Resolve files in public/ against Vite's deployment base path. */
export function assetUrl(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
