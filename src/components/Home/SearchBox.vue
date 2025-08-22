<template>
  <div
    class="ml-8 mr-8 flex items-center rounded bg-base-300 pr-2 text-gray-400"
  >
    <input
      type="text"
      :placeholder="$t('notes_list.search_notes')"
      class="flex-1 bg-transparent p-3 outline-none"
      v-model="query"
    />
    <v-icon name="fa-search"/>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useNotesStore } from '../../store';

const query = ref("");
const notesStore = useNotesStore();

watch(query, () => {
  notesStore.queryNotes(query.value);
});
</script>

<style lang="scss" scoped></style>
