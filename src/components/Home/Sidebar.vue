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
                
                <category-menu />

                <tag-menu />
                <!-- <menu-item label="COLORS" /> -->
                <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
            </div>
        </div>
        <div class="mb-4 w-full flex items-start ml-10">
            <button class="btn btn-secondary border-none" @click="logout">
                <v-icon name="fa-sign-out-alt" />
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store";
import { confirm } from "../commom/customSwal";
import CategoryMenu from "../Sidebar/CategoryMenu.vue";
import MenuItem from "./MenuItem.vue";
import TagMenu from "../Sidebar/TagMenu.vue";

const store = useAuthStore();
const router = useRouter();

const { authState } = storeToRefs(store);

const logout = async () => {
    const { isConfirmed } = await confirm({
        title: "Are you sure?",
        text: "You want to logout?",
        icon: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });

    if (!isConfirmed) return;
    store.logout();
    router.push({ name: "login" });
};

</script>

<style></style>
