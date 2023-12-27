<template>
    <div class="flex pl-32 pr-32 pt-16 pb-16 w-full h-screen">
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
import notesJson from "../data/notes.json";
const router = useRouter();
const store = useAuthStore();
const notesStore = useNotesStore();

const { logout } = store;

const handleClickLogout = () => {
    logout();
    router.push({ name: "login" });
};

onMounted(() => {
    notesStore.setNotes(notesJson);
});
</script>

<style></style>
