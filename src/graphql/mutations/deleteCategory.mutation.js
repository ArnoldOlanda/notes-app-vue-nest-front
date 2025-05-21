import gql from "graphql-tag";

export const DELETE_CATEGORY_MUTATION = gql`
    mutation DeleteCategory($categoryId: Int!) {
        deleteCategory(id: $categoryId) {
            id
            name
        }
    }
`