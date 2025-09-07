import gql from "graphql-tag";

export const GET_NOTES_BY_USER = gql`query GetNotesByUserId($userId: Int!) {
    getNotesByUserId(id: $userId) {
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