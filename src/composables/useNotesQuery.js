import { reactive, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_NOTES_BY_USER } from "../graphql/queries/getNotesByUser.query";
import { notesAdapter } from "../adapters/notes.adapter";

export function useNotesQuery(userId) {
    const notes = ref([]);
    const filteredNotes = ref([]);
    const filters = reactive({
        category: null,
        tag: null,
    });

    const {
        result: notesQuery,
        loading: notesLoading,
        error: notesError,
        refetch,
    } = useQuery(GET_NOTES_BY_USER, () => ({ userId }));

    const getNotes = async () => {
        const result = await refetch({userId});
        console.log(result);
    };

    const applyFilters = () => {
        if (!notes.value || !notes.value.length) {
            filteredNotes.value = [];
            return;
        }

        // Start with all notes
        let result = [...notes.value];
        
        // Apply category filter if active
        if (filters.category) {
            result = result.filter((note) => {
                return Boolean(note?.category?.id === filters.category);
            });
        }
        
        // Apply tag filter if active (on the already filtered results)
        if (filters.tag) {
            result = result.filter((note) => {
                return Boolean(
                    note?.tags && 
                    Array.isArray(note.tags) && 
                    note.tags.some((tag) => tag?.id === filters.tag)
                );
            });
        }
        
        // Update filtered notes
        filteredNotes.value = result;

        console.log("Applied filters:", filters, "Results:", filteredNotes.value.length);
    };

    watch(filters, () => {        
        applyFilters();
    });

    watch(notesQuery, (newValue) => {
        console.log("Notes query result:", newValue);
        if (newValue?.getNotesByUserId) {
            notes.value = notesAdapter(newValue.getNotesByUserId);
            // Apply filters to the new notes
            applyFilters();
        }
    });

    watch(notesError, (error) => {
        if (error) console.error("Error fetching notes:", error);
    });

    return {
        notes,
        filteredNotes,
        filters,
        notesLoading,
        notesError,
        getNotes,
    };
}
