import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' && process.env.REACT_APP_BASE_API
      ? process.env.REACT_APP_BASE_API
      : 'http://localhost:5000/',
});

export const saveToken = (token: string): void => localStorage.setItem('token', token);

export const getToken = (): string | null => localStorage.getItem('token');

export const removeToken = (): void => localStorage.removeItem('token');

export const setTokenHeader = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
