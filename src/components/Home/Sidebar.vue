<template>
    <div class="container bg-blue-500 w-1/6 text-white">
        <div class="flex justify-between items-center p-6">
            <img
                src="../../../public/prueba.jpg"
                alt="profile_photo"
                class="w-10 h-10 rounded-full"
            />
            <span>Isabella Ray</span>
            <v-icon name="fa-ellipsis-v" />
        </div>
        <div class="flex flex-col items-start">
            <menu-item label="CATEGORIES" icon-name="fa-plus" />
            <menu-item label="TAGS" icon-name="fa-plus" />
            <menu-item label="COLORS" icon-name="fa-plus" />
            <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
        </div>
    </div>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
</script>

<style></style>
