import axios from 'axios';
import { API_URL } from '../constants';
import { useAuthStore } from '../store';

export const notesApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, //Para que las cookies se envien en cada peticion
    credentials: 'include', // Para que las cookies se envíen en cada peticion
});

notesApi.interceptors.request.use(
    (config) => {
        const store = useAuthStore(); // Accede al store de Pinia
        const token = store.authState.token; // Obtiene el access token

        if (token) config.headers['Authorization'] = `Bearer ${token}`; // Agrega el Bearer token a las cabeceras
        
        return config; // Devuelve la configuración de la solicitud modificada
    },
    (error) => {
        return Promise.reject(error); // Manejo de errores
    }
);