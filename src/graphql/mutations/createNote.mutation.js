import gpl from "graphql-tag";

export const CREATE_NOTE_MUTATION = gpl`
mutation CreateNote($userId: Int!, $createNoteInput: CreateNoteInput!) {
    createNote(id: $userId, createNoteInput: $createNoteInput) {
        id
        title
        description
        date
        tags {
            id
            name
        }
        category {
            id
            name
        }
    }
}
`;
