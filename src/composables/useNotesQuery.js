//@ts-check
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
        // if (result?.getNotesByUserId) {
        //     filteredNotes.value = result.getNotesByUserId;
        //     notes.value = notesAdapter(result.getNotesByUserId);
        // }
    };

    watch(filters, (newFilters) => {
        console.log("Filters changed:", newFilters);
    });

    watch(notesQuery, (newValue) => {
        console.log("Notes query result:", newValue);
        if (newValue?.getNotesByUserId) {
            filteredNotes.value = newValue.getNotesByUserId;
            notes.value = notesAdapter(newValue.getNotesByUserId);
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
