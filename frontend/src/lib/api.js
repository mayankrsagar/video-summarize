import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      Cookies.remove('authToken');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to attach token
api.interceptors.request.use(config => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = data => api.post('/auth/register', data);
export const login = data => api.post('/auth/login', data);
export const fetchMetadata = url => api.post('/videos/fetch', { youtubeUrl: url });
export const summarize = url => api.post('/videos/summarize', { youtubeUrl: url });
export const getHistory = () => api.get('/videos');

export default api;