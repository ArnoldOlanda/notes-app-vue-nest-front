import { ref } from "vue";
import { defineStore } from "pinia";
import { getNotesByCategoryWithCountService } from "../../services/notes.service";

export const useNotesStore = defineStore("notes", () => {
    const notes = ref([]);
    const filteredNotes = ref([]);
    const selectedNote = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const notesCategoriesWithCount = ref([]);

    const setNotes = (payload) => {
        notes.value = payload;
        filteredNotes.value = payload;
    };

    const setNotesCategoriesWithCount = (payload) => {
        notesCategoriesWithCount.value = payload;
    };

    const refreshNotesCount = async (id) => {
        try {
            const data = await getNotesByCategoryWithCountService(id);
            notesCategoriesWithCount.value = data;
        } catch (error) {
            console.log(error);
        }
    }

    const setSelectedNote = (note) => {
        selectedNote.value = note;
    };

    const filterNotes = (payload) => {
        filteredNotes.value = notes.value.filter((n) => n.category === payload);
    };

    const queryNotes = (payload = "") => {
        filteredNotes.value = notes.value.filter((n) =>
            n.description.toLowerCase().includes(payload.toLowerCase())
        );
    };

    return {
        //State
        notes,
        notesCategoriesWithCount,
        selectedNote,
        filteredNotes,
        isLoading,
        errorMessage,

        //Actions
        setNotes,
        setNotesCategoriesWithCount,
        refreshNotesCount,
        setSelectedNote,
        filterNotes,
        queryNotes,
    };
});
