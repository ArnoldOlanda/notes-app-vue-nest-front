import { notesApi } from "../api"

export const googleService = async (token = "") => {
    try {
        const {data} = await notesApi.post("auth/google/validate", {
            token
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}