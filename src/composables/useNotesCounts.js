import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { mixin } from "../components/commom/customSwal";

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

    // watch(error, (error) => {
    //     console.log(error.message);
    //     const isTooManyRequestsError = error.message.includes('ThrottlerException')
        
    //     if(isTooManyRequestsError){
    //         mixin({
    //             icon: 'error',
    //             title: 'Has realizado demasiadas solicitudes. Por favor, intenta nuevamente en unos segundos.',
    //         })
    //     }
    // });

    const refetchNotesCounts = async () => {
        await refetch({userId});
    };

    return {
        notesCategoriesWithCount,
        notesTagsWithCount,
        error,
        
        refetchNotesCounts,
    };
}
