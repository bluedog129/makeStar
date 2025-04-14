export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_PATH = import.meta.env.VITE_API_PATH;
export const API_AUTH_TOKEN = import.meta.env.VITE_API_AUTH_TOKEN;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': API_AUTH_TOKEN,
};

export const getEndpoint = (path: string) => `${API_PATH}${path}`;