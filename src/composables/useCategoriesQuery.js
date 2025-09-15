//@ts-check
import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CATEGORIES_BY_USER } from "../graphql/queries/getCategoriesByUser.query";

export function useCategoriesQuery(userId = 0) {

    const {
        result,
        loading,
        error,
        refetch,
    } = useQuery(GET_CATEGORIES_BY_USER, () => ({ userId }));

    const categories = computed(() => result.value?.getCategories);

    watch(error, (error) => {
        if (error) console.error("Error fetching categories:", error.message);
    });

    const reloadCategories = (id = 0) => refetch({ userId: id });

    return {
        categories,
        categoriesLoading: loading,
        categoriesError: error,
        reloadCategories,
    };
}
