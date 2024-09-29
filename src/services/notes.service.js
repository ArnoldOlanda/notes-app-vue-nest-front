import { notesApi } from "../api";

export const getNotesService = async (user = 1) => {
    try {
        const { data } = await notesApi.get(`/notes/${user}`);
        return data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
};

export const getNotesByCategoryWithCountService = async (user = 1) => {
    try {
        const { data } = await notesApi.get(`/notes/category-count/${user}`);
        return data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
}

export const postNoteService = async (user,note) => {
    try {
        const { data } = await notesApi.post(`/notes/${user}`, note);
        return data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
}

export const patchNoteService = async (note) => {
    // return console.log(note);
    
    const {id,...rest} = note
    try {
        const { data } = await notesApi.patch(`/notes/${id}`, rest);
        return data;
    } catch (error) {
        console.log(error);
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
}

export const deleteNoteService = async (note) => {
    try {
        const { data } = await notesApi.delete(`/notes/${note}`);
        return data;
    } catch (error) {
        if(error.response){
            throw new Error(error.response.data.message);
        } else throw new Error(error)
    }
}
