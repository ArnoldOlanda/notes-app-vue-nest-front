import gql from "graphql-tag";

export const UPDATE_TAG_MUTATION = gql`
    mutation updateTag($id: Int!, $data: UpdateTagInput!) {
        updateTag(id: $id, updateTagInput: $data) {
            id
            name
        }
    }
`;