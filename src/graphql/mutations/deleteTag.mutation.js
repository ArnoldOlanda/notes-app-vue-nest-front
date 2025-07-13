import gql from "graphql-tag";

export const DELETE_TAG_MUTATION = gql`
    mutation deleteTag($id: Int!) {
        deleteTag(id: $id) {
            id
            name
        }
    }
`