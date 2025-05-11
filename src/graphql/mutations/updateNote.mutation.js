import gpl from "graphql-tag";

export const UPDATE_NOTE_MUTATION = gpl`
mutation UpdateNote($noteId: Int!, $updateNoteInput: UpdateNoteInput!) {
    updateNote(id: $noteId, updateNoteInput: $updateNoteInput) {
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
