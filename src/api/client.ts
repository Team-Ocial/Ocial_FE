const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const baseUrl = rawBaseUrl.replace(/\/+$/, ''); // 끝 슬래시 제거

const buildUrl = (path: string) => {
  if (!baseUrl) throw new Error('VITE_API_BASE_URL is not set');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${response.status} ${response.statusText}: ${text}`);
  }

  return response.json() as Promise<T>;
}
