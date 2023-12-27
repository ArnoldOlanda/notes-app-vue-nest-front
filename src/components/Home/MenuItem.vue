<template>
    <div class="w-full group" :class="{ 'is-active': colapsed }">
        <div
            class="font-bold flex h-12 justify-between items-center w-full pl-6 pr-6 cursor-pointer hover:bg-blue-400"
            @click="toogle"
        >
            <span>{{ props.label }}</span
            ><v-icon :name="props.iconName" />
        </div>
        <div
            class="w-full h-0 overflow-hidden transition-all duration-500"
            :class="{
                [`group-[.is-active]:h-[${
                    categoriesData.length * 40
                }px]`]: true,
            }"
        >
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
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    iconName: {
        type: String,
        required: true,
    },
});

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

const colapsed = ref(false);

const toogle = () => {
    colapsed.value = !colapsed.value;
};
</script>

<style></style>
