<template>
    <div class="flex px-32 py-16 w-full h-screen">
        <div class="w-full h-full flex rounded-2xl shadow-2xl overflow-hidden">
            <Sidebar class="w-1/6" />
            <NoteList class="w-3/12" />
            <NoteDetail class="flex-1" />
        </div>
        <!-- <button
            @click="handleClickLogout"
            class="bg-blue-600 text-white rounded-xl w-32 p-4"
        >
            Logout
        </button> -->
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, useNotesStore } from "../store";
import Sidebar from "../components/Home/Sidebar.vue";
import NoteList from "../components/Home/NotesList.vue";
import NoteDetail from "../components/Home/NoteDetail.vue";
import { getNotesService } from "../services/notes.service";
import { notesAdapter } from "../adapters/notes.adapter";

const router = useRouter();
const store = useAuthStore();
const notesStore = useNotesStore();

const { logout } = store;

// const handleClickLogout = () => {
//     logout();
//     router.push({ name: "login" });
// };

const getNotes = async () => {
    const notes = await getNotesService(store.authState.user.id);
    
    notesStore.setNotes(notesAdapter(notes));
};

onMounted(() => {
    getNotes();
});
</script>

<style></style>
