<template>
    <div class="bg-gray-100 w-1/4 h-screen">
        <div class="flex w-full justify-between items-center pl-8 pr-8 pt-6">
            <span class="text-2xl font-bold">General</span>
            <v-icon name="fa-retweet" scale="1.5" fill="#cccccc" />
        </div>
        <div class="flex w-full pl-8 pr-8 pt-4 justify-between text-gray-300">
            <span>42 notes</span>
            <div class="">
                <v-icon name="fa-filter" />
                <v-icon name="fa-tag" />
                <v-icon name="fa-ellipsis-v" />
            </div>
        </div>
        <div class="flex w-full flex-col gap-3 mt-2">
            <div
                class="flex ml-8 mr-8 pr-2 items-center bg-gray-200 text-gray-400 rounded"
            >
                <input
                    type="text"
                    placeholder="Search notes..."
                    class="flex-1 outline-none bg-transparent p-3"
                />
                <v-icon name="fa-search" />
            </div>
            <div class="ml-8 mr-8">
                <button class="w-full h-10 bg-blue-500 text-white rounded">
                    <v-icon name="fa-plus" />
                    <span class="ml-2">ADD NOTE</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>
