import { API_URL } from "../constants";

//@ts-check
export const registerService = async (name, username, password) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
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
