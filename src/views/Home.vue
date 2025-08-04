<template>
    <div class="flex w-full h-screen bg-pattern">
        <div class="w-full h-full flex shadow-2xl overflow-hidden">
            <Sidebar />
            <NoteList class="w-3/12" />
            <NoteDetail class="flex-1" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "../components/Home/Sidebar.vue";
import NoteList from "../components/Home/NotesList.vue";
import NoteDetail from "../components/Home/NoteDetail.vue";


const router = useRouter();
const route = useRoute();

onMounted(() => {
    const query = route.query;
    if (query) {
        router.replace({ name: route.name, query: null });
    }        
});
</script>

<style>
.bg-pattern {
    --s: 80px; /* the size */
    --c: #dadcdd;

    --_s: calc(2 * var(--s)) calc(2 * var(--s));
    --_g: 35.36% 35.36% at;
    --_c: #0000 66%, #c9c9c9 68% 70%, #afafaf00 72%;
    background: radial-gradient(var(--_g) 100% 25%, var(--_c))
            var(--s) var(--s) / var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) var(--s)
            var(--s) / var(--_s),
        radial-gradient(var(--_g) 100% 25%, var(--_c)) 0 0 /
            var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) 0 0 / var(--_s),
        repeating-conic-gradient(var(--c) 0 25%, #0000 0 50%) 0 0 /
            var(--_s),
        radial-gradient(var(--_c)) 0 calc(var(--s) / 2) / var(--s)
            var(--s) var(--c);
}
</style>
