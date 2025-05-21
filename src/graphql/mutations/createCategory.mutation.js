import gql from "graphql-tag";

export const CREATE_CATEGORY_MUTATION = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
        createCategory(createCategoryInput: $createCategoryInput) {
            id
            name
        }
    }
`;