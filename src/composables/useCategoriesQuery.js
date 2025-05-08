//@ts-check
import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CATEGORIES_BY_USER } from "../graphql/queries/getCategoriesByUser.query";

export function useCategoriesQuery(userId) {

    const {
        result: categoriesQuery,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(GET_CATEGORIES_BY_USER, () => ({ userId }));

    const categories = computed(() => categoriesQuery.value?.getCategories);

    watch(categoriesError, (error) => {
        if (error) console.error("Error fetching categories:", error.message);
    });

    return {
        categories,
        categoriesLoading,
        categoriesError,
    };
}
