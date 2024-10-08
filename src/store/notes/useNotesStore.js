import { ref } from "vue";
import { defineStore } from "pinia";
import { getNotesByCategoryWithCountService, getNotesByTagWithCountService } from "../../services/notes.service";

export const useNotesStore = defineStore("notes", () => {
    const notes = ref([]);
    const tags = ref([]);
    const filteredNotes = ref([]);
    const selectedNote = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const notesCategoriesWithCount = ref([]);
    const notesTagsWithCount = ref([]);
    const currentMode = ref("create"); // create | edit

    const setLoading = (payload) => {
        isLoading.value = payload;
    }
    const setNotes = (payload) => {
        isLoading.value = false;
        notes.value = payload;
        filteredNotes.value = payload;
    };

    const setTags = (payload) => {
        isLoading.value = false;
        tags.value = payload;
    }

    const setNotesCategoriesWithCount = (payload) => {
        notesCategoriesWithCount.value = payload;
    };

    const setNotesTagsWithCount = (payload) => {
        notesTagsWithCount.value = payload;
    }

    const refreshNotesCount = async (id) => {
        try {
            const [notesCategoryCount, notesTagCount] = await Promise.allSettled([
                getNotesByCategoryWithCountService(id), 
                getNotesByTagWithCountService(id)
            ]);
            console.log(notesTagCount.value);
            
            notesCategoriesWithCount.value = notesCategoryCount.value;
            notesTagsWithCount.value = notesTagCount.value;
        } catch (error) {
            console.log(error);
        }
    }

    const setSelectedNote = (note) => {
        selectedNote.value = note;
    };

    const setCurrentMode = (mode) => {
        currentMode.value = mode;
    }

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
        tags,
        notesCategoriesWithCount,
        notesTagsWithCount,
        selectedNote,
        filteredNotes,
        isLoading,
        errorMessage,
        currentMode,

        //Actions
        setNotes,
        setTags,
        setLoading,
        setNotesCategoriesWithCount,
        setNotesTagsWithCount,
        refreshNotesCount,
        setSelectedNote,
        filterNotes,
        queryNotes,
        setCurrentMode,
    };
});
