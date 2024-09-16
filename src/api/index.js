import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../constants';
import { useAuthStore } from '../store';

export const notesApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, //Para que las cookies se envien en cada peticion
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

// notesApi.interceptors.response.use(
//     (response) => {
//         // Si la respuesta es exitosa, no hacemos nada especial
//         return response;
//     },
//     async (error) => {
//         const store = useAuthStore();
//         const originalRequest = error.config;
        
//         // Si el error es 401 (Unauthorized), intentamos renovar el token
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Prevenir loops infinitos
            
//             // Obtener el refresh token desde las cookies
//             const refreshToken = Cookies.get('refresh_token');
            
//             // Si no hay refresh token, redirige a login
//             if (!refreshToken) {
//                 window.location.href = '/auth/login'; // Cambia según tu ruta de login
//                 return Promise.reject(error);
//             }

//             // Intentar renovar el access token
//             try {
//                 const response = await axios.post(`${API_URL}/auth/refresh-token`, {
//                     refresh_token: refreshToken
//                     }, { withCredentials: true } // Asegurar que las cookies se envíen
//                 ); 

//                 // Guardar el nuevo access token en el localStorage o en el estado de Pinia
//                 const newAccessToken = response.data.token;
//                 // localStorage.setItem('access_token', newAccessToken);
//                 store.setAccesToken(newAccessToken);

//                 // Modificar la cabecera del request original con el nuevo token
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                 // Reintentar la solicitud original con el nuevo token
//                 return notesApi(originalRequest);
//             } catch (err) {
//                 // Si falla la renovación, redirige al login
//                 window.location.href = '/login'; // Cambia según tu ruta de login
//                 return Promise.reject(err);
//             }
//         }

//         // Si no es un 401, rechazar el error normalmente
//         return Promise.reject(error);
//     }
// );