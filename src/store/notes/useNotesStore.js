import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "../auth/useAuthStore";
import { useCategoriesQuery } from "@/composables/useCategoriesQuery";
import { useTagsQuery } from "@/composables/useTagsQuery";
import { useNotesQuery } from "@/composables/useNotesQuery";
import { useNotesCounts } from "@/composables/useNotesCounts";

export const useNotesStore = defineStore("notes", () => {
    const authStore = useAuthStore();
    const userId = authStore.authState.user.id;

    const { notes, filteredNotes, filters, notesLoading, getNotes } = useNotesQuery(userId);
    const { tags } = useTagsQuery(userId);
    const { categories } = useCategoriesQuery(userId);
    const { 
        notesCategoriesWithCount, 
        notesTagsWithCount, 
      } = useNotesCounts(userId);

    const selectedNote = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const currentMode = ref("create"); // create | edit
       
    const setLoading = (payload) => {
        isLoading.value = payload;
    }

    const setNotesCategoriesWithCount = (payload) => {
        notesCategoriesWithCount.value = payload;
    };

    const setNotesTagsWithCount = (payload) => {
        notesTagsWithCount.value = payload;
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
        notesLoading,
        tags,
        categories,
        notesCategoriesWithCount,
        notesTagsWithCount,
        filters,
        selectedNote,
        filteredNotes,
        isLoading,
        errorMessage,
        currentMode,

        //Actions
        setLoading,
        getNotes,
        setNotesCategoriesWithCount,
        setNotesTagsWithCount,
        setSelectedNote,
        filterNotes,
        queryNotes,
        setCurrentMode,
    };
});
