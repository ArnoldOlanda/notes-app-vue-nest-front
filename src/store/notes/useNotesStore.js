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

    const { notes, filteredNotes, filters, notesLoading, getNotes, clearFilters, getTrashedNotes } = useNotesQuery(userId);

    const { mutate: deleteNoteMutation } = useMutation(DELETE_NOTE_MUTATION);

    const { tags, reloadTags } = useTagsQuery(userId);
    const { categories, reloadCategories } = useCategoriesQuery(userId);
    const { 
        notesCategoriesWithCount, 
        notesTagsWithCount,
        refetchNotesCounts 
      } = useNotesCounts(userId);

    const selectedNote = ref(null);
    const selectedCategoryName = computed(() => {
        if(showingTrashedNotes.value && !filters.category) return 'Trashed';
        if(!filters.category) return 'All';
        return categories.value.find(c => c.id === filters.category)?.name || 'All';
    });
    const isLoading = ref(false);
    const errorMessage = ref("");
    const currentMode = ref("create"); // create | edit

    const showingTrashedNotes = ref(false);
       
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

    const setShowingTrashedNotes = (value) => {
        showingTrashedNotes.value = value;
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
            
            const result = await deleteNoteMutation({ id, type: 'hard' });

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

    const moveToTrash = async (id) => {
        try {
            const {isConfirmed} = await confirm({
                title: "Are you sure?",
                text: "This note will be moved to the trash.",
                icon: "warning",
                confirmButtonText: "Yes, move to trash",
                cancelButtonText: "No, cancel",
            })
            if(!isConfirmed) return;
            
            const result = await deleteNoteMutation({ id });

            
            if(result?.data?.deleteNote){
                swal({
                    title: "Success",
                    text: "Note moved to trash successfully",
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
                text: "An error occurred, contact the administrator",
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
        selectedCategoryName,
        filters,
        selectedNote,
        filteredNotes,
        isLoading,
        errorMessage,
        currentMode,
        showingTrashedNotes,

        //Actions
        setLoading,
        getNotes,
        getTrashedNotes,
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
        moveToTrash,
        setCurrentMode,
        setShowingTrashedNotes,
    };
});
