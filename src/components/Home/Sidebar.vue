<template>
    <div class="container bg-blue-500 h-screen w-1/5 text-white">
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
            <div class="font-bold flex justify-between w-full pl-6 pr-6 mb-5">
                <span>CATEGORIES</span><v-icon name="fa-plus" />
            </div>
            <div
                v-for="item in categoriesData"
                :key="item.id"
                class="w-full flex justify-between hover:bg-blue-600 transition-all h-10 items-center pl-6 pr-6 text-gray-200 hover:text-gray-100"
            >
                <span>{{ item.item }}</span>
                <span class="bg-blue-600 w-8 rounded-full text-sm">{{
                    item.count
                }}</span>
            </div>
            <div class="font-bold flex justify-between w-full pl-6 pr-6 mt-5">
                <span>TAGS</span><v-icon name="fa-plus" />
            </div>
            <div class="font-bold flex justify-between w-full pl-6 pr-6 mt-5">
                <span>COLORS</span><v-icon name="fa-plus" />
            </div>
            <div class="font-bold flex justify-between w-full pl-6 pr-6 mt-5">
                <span>TRASH</span><v-icon name="fa-regular-trash-alt" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const categoriesData = ref([
    {
        id: 1,
        item: "Bussines",
        count: 20,
    },
    {
        id: 2,
        item: "Design",
        count: 10,
    },
    {
        id: 3,
        item: "General",
        count: 23,
    },
    {
        id: 4,
        item: "Journal",
        count: 4,
    },
    {
        id: 5,
        item: "Personal",
        count: 31,
    },
    {
        id: 6,
        item: "Programming",
        count: 12,
    },
]);
</script>

<style></style>
