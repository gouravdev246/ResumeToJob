let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5001';
if (baseUrl.endsWith('/')) {
  baseUrl = baseUrl.slice(0, -1);
}
export const BASE_URL = baseUrl;
