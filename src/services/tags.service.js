import { notesApi } from "../api";

export const getTagsService = async (id) => {
    try {
        return notesApi.get(`/tag/${id}`);
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
}