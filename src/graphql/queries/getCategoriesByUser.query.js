import gql from "graphql-tag";

export const GET_CATEGORIES_BY_USER = gql`query GetCategoriesByUserId($userId: Int!) {
    getCategories(userId: $userId) {
        id
        name
        active
    }
}`;