<template>
  <div class="flex h-full w-2/6 flex-col bg-gray-100 lg:w-1/4">
    <div class="my-2">
      <div class="flex w-full items-center justify-between px-8 pt-6">
        <span class="text-2xl font-bold">General</span>
        <div class="tooltip" data-tip="Reload">
          <v-icon name="fa-retweet" scale="1.5" fill="#cccccc" @click="handleClickRefreshNotes" />
        </div>
      </div>
      <div class="flex w-full justify-start px-8 pt-4 text-gray-300">
        <span>{{ notes.length }} notes</span>
        <!-- <div class="">
          <v-icon name="fa-filter" />
          <v-icon name="fa-tag" />
          <v-icon name="fa-ellipsis-v" />
        </div> -->
      </div>
      <div class="my-2 flex w-full flex-col gap-3">
				<SearchBox />
				<AddNoteButton />
      </div>
    </div>
    <div class="flex-1 overflow-auto">
      <span v-if="notesLoading"> Loading... </span>
      <NoteItem v-else v-for="note in notes" :key="note.id" :note-data="note" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNotesStore } from "../../store";
import NoteItem from "./NoteItem.vue";
import SearchBox from "./SearchBox.vue";
import AddNoteButton from "./AddNoteButton.vue";

const notesStore = useNotesStore();
const { filteredNotes: notes, notesLoading } = storeToRefs(notesStore);

const handleClickRefreshNotes = async () => {
	await notesStore.getNotes();
}

</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: rgb(59 130 246) #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(59 130 246);
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>
