import gql from "graphql-tag";

export const DELETE_NOTE_MUTATION = gql`
    mutation delete($id: Int!) {
        deleteNote(id: $id) {
            id
            title
            date
            active
        }
    }
`