export const notesAdapter = (notes) => {
    return notes.map((note) => ({
        ...note,
        date: new Date(note.date).toLocaleDateString(),
    }));
};
