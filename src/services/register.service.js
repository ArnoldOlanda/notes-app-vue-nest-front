import { notesApi } from "../api";
import { API_URL } from "../constants";

//@ts-check
export const registerService = async (name, email, password) => {
    try {
        const { data } = await notesApi.post(`${API_URL}/auth/register`, {
            name,
            email,
            password
        });
        
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error de conexión");
        }
    }
};
