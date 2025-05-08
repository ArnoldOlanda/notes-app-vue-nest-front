//@ts-check
import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_TAGS_BY_USER } from "../graphql/queries/getTagsByUser.query";

export function useTagsQuery(userId) {
    // const tags = ref([]);

    const {
        result: tagsQuery,
        loading: tagsLoading,
        error: tagsError,
    } = useQuery(GET_TAGS_BY_USER, () => ({ userId }));

    const tags = computed(() => tagsQuery.value?.getTags);

    watch(tagsError, (error) => {
        if (error) console.error("Error fetching tags:", error);
    });

    return {
        tags,
        tagsLoading,
        tagsError,
    };
}
