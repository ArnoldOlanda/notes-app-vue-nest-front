import gql from "graphql-tag";

export const GET_NOTES_BY_USER = gql`query GetNotesByUserId($userId: Int!, $active: String) {
    getNotesByUserId(id: $userId, active: $active) {
        id
        title
        description
        description_html
        date
        active
        category {
            id
            name
        }
        tags {
            id
            name
        }
    }
}`;