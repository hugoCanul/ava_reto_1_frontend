import axios from 'axios';

const api = axios.create({
    baseurl: 'http://localhost:8000/api',
});

// interceptor para aniadir el token jwt a todas las solicitudes
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error)
});

export default api;