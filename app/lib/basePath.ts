/**
 * Adds CloudFront proxy prefix to internal URLs
 * Required for workshop environment navigation
 */
export function withBasePath(path: string): string {
  // In production, this would check environment variable
  // For workshop, always add proxy prefix
  const basePath = '/proxy/3000';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
