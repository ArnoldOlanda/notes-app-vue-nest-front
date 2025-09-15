import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@vue/apollo-composable";
import { useAuthStore } from "../auth/useAuthStore";
import { useCategoriesQuery } from "@/composables/useCategoriesQuery";
import { useTagsQuery } from "@/composables/useTagsQuery";
import { useNotesQuery } from "@/composables/useNotesQuery";
import { useNotesCounts } from "@/composables/useNotesCounts";
import { DELETE_NOTE_MUTATION } from "../../graphql/mutations/deleteNote.mutation";
import { confirm, swal } from "../../components/commom/customSwal";

export const useNotesStore = defineStore("notes", () => {
    const authStore = useAuthStore();
    const userId = authStore.authState.user.id;

    const { notes, filteredNotes, filters, notesLoading, getNotes, clearFilters } = useNotesQuery(userId);

    const {
        mutate: deleteNoteMutation,
        loading: deleteNoteLoading
    } = useMutation(DELETE_NOTE_MUTATION);

    const { tags, reloadTags } = useTagsQuery(userId);
    const { categories, reloadCategories } = useCategoriesQuery(userId);
    const { 
        notesCategoriesWithCount, 
        notesTagsWithCount,
        refetchNotesCounts 
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

    const deleteNote = async (id = 0) =>{
        try {
            const {isConfirmed} = await confirm({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this note!",
                icon: "warning",
                confirmButtonText: "Yes, delete it",
                cancelButtonText: "No, cancel",
            })
            if(!isConfirmed) return;
            
            const result = await deleteNoteMutation({ id });

            // console.log(result);
            
            if(result?.data?.deleteNote){
                swal({
                    title: "Success",
                    text: "Note deleted successfully",
                    icon: "success",
                });
            }

            setSelectedNote(null);

            await Promise.all([
                getNotes(),
                refetchNotesCounts()
            ]);

        } catch (error) {
            console.log(error);
            swal({
                title: "Error",
                text: "An error occurred while deleting the note",
                icon: "error",
            })
        }
    }

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
        refetchNotesCounts,
        reloadCategories,
        reloadTags,
        setNotesCategoriesWithCount,
        setNotesTagsWithCount,
        setSelectedNote,
        filterNotes,
        queryNotes,
        clearFilters,
        deleteNote,
        setCurrentMode,
    };
});
