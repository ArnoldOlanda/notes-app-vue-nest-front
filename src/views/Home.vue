<template>
    <div class="flex">
        <Sidebar />
        <NoteList />
        <!-- <button
            @click="handleClickLogout"
            class="bg-blue-600 text-white rounded-xl w-32 p-4"
        >
            Logout
        </button> -->
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth/useAuthStore";
import Sidebar from "../components/Home/Sidebar.vue";
import NoteList from "../components/Home/NotesList.vue";
const router = useRouter();
const store = useAuthStore();
const { logout } = store;

const handleClickLogout = () => {
    logout();
    router.push({ name: "login" });
};
</script>

<style></style>
