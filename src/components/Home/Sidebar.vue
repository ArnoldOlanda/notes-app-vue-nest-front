<template>
    <div class="container bg-primary w-3/12 lg:w-1/6 text-white flex flex-col">
        <div class="flex-1">
            <div class="flex justify-between items-center p-6">
                <img
                    :src="authState.user.avatar"
                    alt="profile_photo"
                    class="w-10 h-10 rounded-full"
                />
                <span>{{ authState.user.name }}</span>
                <v-icon name="fa-ellipsis-v" />
            </div>
            <div class="w-full">
                <menu-item label="CATEGORIES" open>
                    <div 
                        v-for="category in notesCategoriesWithCount" 
                        :key="category.id"
                        @click="filters.category = category.id" 
                        class=" px-4 py-3 w-full text-blue-200 flex justify-between hover:bg-blue-600"
                        :class="{ 'bg-blue-600': filters.category === category.id }"
                    >
                        <span>{{ category.category }} </span>
                        <span 
                            class=" w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center"
                            :class="{ 'bg-blue-700': filters.category === category.id }"
                        >
                            {{ category.count }}
                        </span>
                    </div>
                </menu-item>
                <menu-item label="TAGS">
                    <div
                        v-for="tag in notesTagsWithCount"
                        :key="tag.id"
                        @click="filters.tag = tag.id"
                        class="px-4 py-3 w-full text-blue-200 flex justify-between hover:bg-blue-600"
                        :class="{ 'bg-blue-600': filters.tag === tag.id }"
                    >
                        <span>{{ tag.name }} </span>
                        <span 
                            class="w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center"
                            :class="{'bg-blue-700': filters.tag === tag.id}"
                        >
                            {{ tag.count }}
                        </span>
                    </div>
                </menu-item>
                <!-- <menu-item label="COLORS" /> -->
                <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
            </div>
        </div>
        <div class="mb-4">
            <button class="btn" @click="logout">
                <v-icon name="fa-sign-out-alt"/>
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useAuthStore, useNotesStore } from "../../store";
import MenuItem from "./MenuItem.vue";
import { confirm } from "../commom/customSwal";


const store = useAuthStore();
const router = useRouter();
const notesStore = useNotesStore();
const { notesCategoriesWithCount, notesTagsWithCount, filters } = storeToRefs(notesStore);
const { authState } = storeToRefs(store);


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
});
</script>

<style></style>
