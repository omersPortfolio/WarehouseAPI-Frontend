import axios from 'axios';

export const TOKEN_KEY = 'warehouse_token';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach JWT to every outgoing request if we have one.
apiClient.interceptors.request.use((config) => {
   const token = localStorage.getItem(TOKEN_KEY);
   if (token) {
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

// Response interceptor: if the server returns 401, our token is bad or expired.
// So we wipe it and send the user to /login.
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);

            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;