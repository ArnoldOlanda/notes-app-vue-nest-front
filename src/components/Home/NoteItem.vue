<template>
    <div
        class="px-8 py-5 border-gray-200 border-y-[1px] cursor-pointer hover:bg-gray-200 transition-colors"
        @click="handleClickNote"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-[15px] h-[15px] bg-red-500 rounded-full" />
                <span class="text-sm text-gray-500">{{ note.category.name }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ new Date(note.date).toLocaleDateString() }}</span>
        </div>
        <div class="flex flex-col items-start text-left">
            <span class="text-lg font-bold">{{ note.title }}</span>
            <p class="text-sm text-gray-800" v-html="note.description">
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "../../store";

const props = defineProps({
    noteData: {
        type: Object,
        required: true,
    },
});

const notesStore = useNotesStore();
const note = ref(props.noteData);

const handleClickNote = () => {
    const noteValue = {
        ...note.value,
        category: note.value.category.id,
        tags: note.value.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    };
    notesStore.setSelectedNote(noteValue);
    notesStore.setCurrentMode("edit");
};
</script>

<style></style>
