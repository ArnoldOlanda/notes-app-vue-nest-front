import { jwtDecode } from "jwt-decode";
import { notesApi } from "../api"

export const revalidateToken = async (token) => {
    try {
        if (isTokenExpired(token)) {
            // Solicitar nuevo access token
            const {data} = await notesApi.get("/auth/refresh-token",{
                withCredentials: true,
            });
            console.log('Revalidando token');
            return data;
        } else return { token };
    
    } catch (error) {
        throw error;
    }
}

export const changePassword = async (changePasswordData) => {
    try {
        const { data } = await notesApi.patch("/auth/change-password", changePasswordData);
        return data;
    } catch (error) {
        throw error;
    }
}


//MOVER A UNA CARPETA DE UTILS
  
// Lógica para verificar si el token ha expirado
const  isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return decodedToken.exp < currentTime;
}