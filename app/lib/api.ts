export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.shngm.io';

export function apiUrl(path: string) {
  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
