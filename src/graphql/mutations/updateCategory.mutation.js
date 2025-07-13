import gql from "graphql-tag";

export const UPDATE_CATEGORY_MUTATION = gql`
    mutation updateCategory($id: Int!, $data: UpdateCategoryInput!) {
        updateCategory(id: $id, updateCategoryInput: $data) {
            id
            name
        }
    }
`;