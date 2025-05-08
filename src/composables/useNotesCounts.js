import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export function useNotesCounts(userId) {
    // const notesCategoriesWithCount = ref([]);
    // const notesTagsWithCount = ref([]);

    const {result, loading, error} = useQuery(gql`
        query getNotesByCategoryWithCount($userId: Int!) {
            getNotesByCategoryWithCount(id: $userId) {
                id
                category
                count
            }
            getNotesByTagWithCount(id: $userId) {
                id
                name
                count
            }
        }
    `,()=>({userId: userId}));
    
    const notesCategoriesWithCount = computed(() => result.value?.getNotesByCategoryWithCount);
    const notesTagsWithCount = computed(() => result.value?.getNotesByTagWithCount);

    watch(result, (newValue) => {
        console.log("Query result:", newValue);
    });

    watch(error, (error) => {
        console.log("Query error:", error);
    });

    return {
        notesCategoriesWithCount,
        notesTagsWithCount,
    };
}
