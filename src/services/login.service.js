//@ts-check

import { notesApi } from "../api";
import { API_URL } from "../constants";

/**
 *
 * @param {string} email Nombre de usuario
 * @param {string} password Password usuario
 * @returns El usuario logueado
 */
export const loginService = async (email = "", password = "") => {
    try {
        const {data} = await notesApi.post(`${API_URL}/auth/sign-in`, {
            email,
            password,
        });
        return data;
    } catch (error) {
        // console.log(error);
        if(error.response) {
            throw new Error(error.response.data.message);
        }else{
            throw new Error("Error de conexión");
        }
    }
};
