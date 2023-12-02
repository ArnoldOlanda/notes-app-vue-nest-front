//@ts-check

import { API_URL } from "../constants";

/**
 *
 * @param {string} username Nombre de usuario
 * @param {string} password Password usuario
 * @returns El usuario logueado
 */
export const loginService = async (username = "", password = "") => {
    try {
        const response = await fetch(`${API_URL}/auth/sign-in`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
