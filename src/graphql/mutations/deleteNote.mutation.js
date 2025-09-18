import gql from "graphql-tag";

export const DELETE_NOTE_MUTATION = gql`
    mutation delete($id: Int!, $type: String) {
        deleteNote(id: $id, type: $type) {
            id
            title
            date
            active
        }
    }
`