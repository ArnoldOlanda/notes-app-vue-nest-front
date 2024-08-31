import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
    const notes = ref([]);
    const filteredNotes = ref([]);
    const selectedNote = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const setNotes = (payload) => {
        notes.value = payload;
        filteredNotes.value = payload;
    };

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
        selectedNote,
        filteredNotes,
        isLoading,
        errorMessage,

        //Actions
        setNotes,
        setSelectedNote,
        filterNotes,
        queryNotes,
    };
});
