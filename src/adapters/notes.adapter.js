export const notesAdapter = (notes) => {
    return notes.map((note) => ({
        ...note,
        tags: note.tags ? note.tags.map((tag) => ({ id: tag.id, name: tag.name })) : [],
        // date: new Date(note.date).toLocaleDateString(),
    }));
};
