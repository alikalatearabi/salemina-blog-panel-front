/**
 * API utility for making authenticated requests to the backend
 */

const API_BASE_URL = 'http://blog-panel-backend:5000/api';

/**
 * Get the authentication token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Make an authenticated API request
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If the response is 401 Unauthorized, clear the token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
    throw new Error('Authentication expired. Please log in again.');
  }

  // For all other errors, throw with the error message from the API
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  // Return the data
  return response.json();
};

/**
 * Get a post by ID
 */
export const getPost = async (postId: string) => {
  const data = await apiRequest<any>(`/posts/${postId}`);
  
  // The API might return the post in a nested 'post' property or directly
  return data.post || data;
};

/**
 * Login the user
 */
export const login = async (email: string, password: string): Promise<{ token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Invalid email or password');
  }

  // Store the token
  localStorage.setItem('token', data.token);
  localStorage.setItem('isAuthenticated', 'true');

  return data;
};

/**
 * Logout the user
 */
export const logout = async (): Promise<void> => {
  const token = getToken();

  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
  }

  // Always clear local storage regardless of API response
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
};

export default {
  getToken,
  isAuthenticated,
  apiRequest,
  login,
  logout,
  getPost,
}; 