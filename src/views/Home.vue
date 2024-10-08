<template>
    <div class="flex w-full h-screen bg-pattern">
        <div class="w-full h-full flex shadow-2xl overflow-hidden">
            <Sidebar class="w-2/12" />
            <NoteList class="w-3/12" />
            <NoteDetail class="flex-1" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore, useNotesStore } from "../store";
import Sidebar from "../components/Home/Sidebar.vue";
import NoteList from "../components/Home/NotesList.vue";
import NoteDetail from "../components/Home/NoteDetail.vue";
import { getNotesService } from "../services/notes.service";
import { notesAdapter } from "../adapters/notes.adapter";
import { getTagsService } from "../services/tags.service";

const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const notesStore = useNotesStore();

const getNotes = async () => {

    const [notes, tags] = await Promise.allSettled([
        getNotesService(store.authState.user.id),
        getTagsService(store.authState.user.id)
    ])
    
    const tagsTransformed = tags.value.data.map(tag=>({ id: tag.id, name: tag.name }));

    notesStore.setNotes(notesAdapter(notes.value.data));
    notesStore.setTags(tagsTransformed);
};

onMounted(() => {
    const query = route.query;
    if (query) {
        router.replace({ name: route.name, query: null });
    }
    getNotes();
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
