const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    return res;
  } catch (error) {
    throw new Error(error.message || 'Network Error');
  }
};
