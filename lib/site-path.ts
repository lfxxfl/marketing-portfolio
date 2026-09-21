const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export function assetPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function routePath(path: string) {
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`;
  return `${basePath}${normalizedPath}`;
}
