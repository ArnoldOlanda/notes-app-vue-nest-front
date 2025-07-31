import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export function useNotesCounts(userId) {
    const {result, loading, error, refetch} = useQuery(gql`
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

    // watch(result, (newValue) => {
    //     console.log("Query result:", newValue);
    // });

    watch(error, (error) => {
        console.log("Query error:", error);
    });

    const refetchNotesCounts = async () => {
        const result = await refetch({userId});
        console.log(result);
    };

    return {
        notesCategoriesWithCount,
        notesTagsWithCount,
        
        refetchNotesCounts,
    };
}
