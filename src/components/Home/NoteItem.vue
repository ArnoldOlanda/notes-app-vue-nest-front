<template>
    <div
        class="pl-8 pr-8 pt-5 pb-5 border-gray-200 border-y-[1px] cursor-pointer hover:bg-gray-200 transition-colors"
        @click="handleClickNote"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-[15px] h-[15px] bg-red-500 rounded-full" />
                <span class="text-sm text-gray-500">{{ note.category }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ note.date }}</span>
        </div>
        <div class="flex flex-col items-start text-left">
            <span class="text-lg font-bold">{{ note.title }}</span>
            <p class="text-sm text-gray-800">
                {{ note.description }}
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
    notesStore.setSelectedNote(note.value);
};
</script>

<style></style>
