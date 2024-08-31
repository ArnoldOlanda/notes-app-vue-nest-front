import { notesApi } from "../api";

export const getCategoriesService = async () => {
    try {
        const { data } = await notesApi.get(`/category`);
        return data;
    } catch (error) {
        console.log(error);
    }
}