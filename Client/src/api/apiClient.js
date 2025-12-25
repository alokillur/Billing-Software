import axios from 'axios';

import { isTokenValid } from '../utils/authUtils';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0',
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.url === '/login' || config.url.endsWith('/login')) {
      return config;
    }

    const token = localStorage.getItem('token');
    
    if (token) {
      if (isTokenValid(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('Shield: Malformed/Expired token detected. Clearing.');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(new Error('Invalid or Malformed Token'));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
