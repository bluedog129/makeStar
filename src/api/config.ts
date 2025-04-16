export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_PATH = import.meta.env.VITE_API_PATH;
export const API_AUTH_TOKEN = import.meta.env.VITE_API_AUTH_TOKEN;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': API_AUTH_TOKEN,
};

// Use the full URL instead of relying on the proxy
export const getEndpoint = (path: string) => `${API_BASE_URL}${API_PATH}${path}`;