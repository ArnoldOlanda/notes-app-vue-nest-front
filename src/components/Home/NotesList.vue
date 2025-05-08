<template>
    <div class="bg-gray-100 w-2/6 lg:w-1/4 h-full">
        <div class="h-2/6">
            <div class="flex w-full justify-between items-center px-8 pt-6">
                <span class="text-2xl font-bold">General</span>
                <v-icon name="fa-retweet" scale="1.5" fill="#cccccc" />
            </div>
            <div class="flex w-full px-8 pt-4 justify-between text-gray-300">
                <span>{{ notes.length }} notes</span>
                <div class="">
                    <v-icon name="fa-filter" />
                    <v-icon name="fa-tag" />
                    <v-icon name="fa-ellipsis-v" />
                </div>
            </div>
            <div class="flex w-full flex-col gap-3 my-4">
                <div
                    class="flex ml-8 mr-8 pr-2 items-center bg-gray-200 text-gray-400 rounded"
                >
                    <input
                        type="text"
                        placeholder="Search notes..."
                        class="flex-1 outline-none bg-transparent p-3"
                        v-model="query"
                    />
                    <v-icon name="fa-search" />
                </div>
                <div class="ml-8 mr-8">
                    <button
                        class="w-full btn btn-primary text-white rounded"
                        @click="handleClickAddNote"
                    >
                        <v-icon name="fa-plus" />
                        <span class="ml-2">ADD NOTE</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="overflow-auto h-4/6">
            <span v-if="notesLoading">
                Loading...
            </span>
            <NoteItem v-else v-for="note in notes" :key="note.id" :note-data="note" />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useNotesStore } from "../../store";
import NoteItem from "./NoteItem.vue";

const query = ref("");
const notesStore = useNotesStore();
const { filteredNotes: notes, notesLoading } = storeToRefs(notesStore);

const handleClickAddNote = () => {
    notesStore.setSelectedNote({
        title: "Nueva nota",
        description: "",
        category: "1",
        tags: [],
    });
    notesStore.setCurrentMode("create");
};

watch(query, () => {
    notesStore.queryNotes(query.value);
});

onMounted(()=>{
    // notesStore.setNotes(notesJson);
})
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: rgb(59 130 246) #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 12px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: rgb(59 130 246);
    border-radius: 10px;
    border: 3px solid #ffffff;
}
</style>
