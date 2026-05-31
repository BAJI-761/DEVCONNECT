import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // important for refresh token cookie
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and silent refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const baseURL = import.meta.env.VITE_API_URL || '/api';
        const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        const { accessToken } = res.data;
        
        if (accessToken) {
          // Update store with new token
          useAuthStore.getState().setAuth({ accessToken });
          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails (e.g. expired or missing cookie), log out the user
        useAuthStore.getState().clearAuth();
        // Option to redirect to login
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
