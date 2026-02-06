import axios from 'axios';

// Dynamically determine the backend URL
// Priority:
// 1. Environment variable (Production)
// 2. Localhost fallback (Development)
const BACKEND_HOST = window.location.hostname;
const BACKEND_PORT = '8000';
const LOCAL_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;

const BASE_URL = import.meta.env.VITE_API_URL || LOCAL_URL;

console.log(`[API] Connecting to: ${BASE_URL}`);

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${BASE_URL}/token/refresh/`, {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('access_token', response.data.access);
                    api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://${BACKEND_HOST}:${BACKEND_PORT}${path}`;
};

export default api;

