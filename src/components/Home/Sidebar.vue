<template>
    <div class="container bg-blue-500 w-1/6 text-white">
        <div class="flex justify-between items-center p-6">
            <img
                :src="authState.user.avatar"
                alt="profile_photo"
                class="w-10 h-10 rounded-full"
            />
            <span>{{ authState.user.name }}</span>
            <v-icon name="fa-ellipsis-v" />
        </div>
        <div class="join join-vertical w-full">
            <menu-item label="CATEGORIES">
                <div 
                    v-for="category in notesCategoriesWithCount" 
                    :key="category.id"
                    @click="categorySelectedId = category.id" 
                    class=" px-4 py-3 w-full text-blue-200 flex justify-between hover:bg-blue-600"
                    :class="{ 'bg-blue-600': categorySelectedId === category.id }"
                >
                    <span>{{ category.category }} </span>
                    <span 
                        class=" w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center"
                        :class="{ 'bg-blue-700': categorySelectedId === category.id }"
                    >
                        {{ category.count }}
                    </span>
                </div>
            </menu-item>
            <menu-item label="TAGS" />
            <menu-item label="COLORS" />
            <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
        </div>
        <div>
            <button class="btn" @click="logout">
                <v-icon name="fa-sign-out-alt"/>
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useAuthStore, useNotesStore } from "../../store";
import { getNotesByCategoryWithCountService } from "../../services/notes.service";
import MenuItem from "./MenuItem.vue";
import { confirm } from "../commom/customSwal";

const store = useAuthStore();
const router = useRouter();
const notesStore = useNotesStore();
const { notesCategoriesWithCount } = storeToRefs(notesStore);
const { authState } = storeToRefs(store);

const categorySelectedId = ref(1);

// const categoriesData = ref([]);

const getCategories = async () => {
    try {
        const data = await getNotesByCategoryWithCountService(authState.value.user.id);
        notesStore.setNotesCategoriesWithCount(data);
    } catch (error) {
        console.error(error);
    }
};

const logout = async () => {
    const {isConfirmed} = await confirm({
        title: "Are you sure?",
        text: "You want to logout?",
        icon: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });

    if(!isConfirmed) return; 
    store.logout();
    router.push({ name: "login" });
};

onMounted(() => {
    getCategories();
});
</script>

<style></style>
