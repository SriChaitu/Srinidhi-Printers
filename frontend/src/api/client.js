import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ===== API Functions =====

/**
 * Fetch all categories
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data.results || response.data;
};

/**
 * Fetch products with optional filters
 * @param {Object} filters - Query parameters (e.g., { category__name: 'Business Cards' })
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (filters = {}) => {
  const response = await api.get('/products/', { params: filters });
  return response.data.results || response.data;
};

/**
 * Fetch a single product by ID
 * @param {number|string} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}/`);
  return response.data;
};

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} Token response
 */
export const login = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  return response.data;
};

/**
 * Get current authenticated user info
 * @returns {Promise<Object>} User profile
 */
export const getMe = async () => {
  const response = await api.get('/auth/me/');
  return response.data;
};

export default api;
