import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

axiosInstance.interceptors.request.use((config) => {
  const freshToken = localStorage.getItem('token');
  if (freshToken) {
    config.headers.Authorization = `Bearer ${freshToken}`;
  }
  return config;
});

export default axiosInstance;
