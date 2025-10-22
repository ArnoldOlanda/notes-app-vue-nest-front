<template>
  <div class="h-full flex flex-col max-h-full bg-base-200 w-full sm:w-auto sm:min-w-[320px] sm:max-w-md">
    <div class="h-auto sm:h-[25%] py-4 sm:py-0">
      <div class="flex w-full items-center justify-between px-4 sm:px-8 pt-2 sm:pt-6">
        <span class="text-xl sm:text-2xl font-bold">{{ selectedCategoryName }}</span>
        <div class="tooltip" :data-tip="$t('notes_list.reload')">
          <v-icon
            name="fa-retweet"
            scale="1.2"
            class="text-gray-400 cursor-pointer"
            @click="handleClickRefreshNotes"
          />
        </div>
      </div>
      <div class="flex w-full justify-between px-4 sm:px-8 pt-2 sm:pt-4 text-gray-400 text-sm">
        <span>
          {{ $t("notes_list.note", notes.length, { count: notes.length }) }}
        </span>
        <div class="">
          <div class="tooltip" :data-tip="$t('notes_list.clear_filters')">
            <v-icon
              name="fa-filter"
              scale="1"
              @click="handleClearFilters"
              class="cursor-pointer"
            />
          </div>
          <!-- <v-icon name="fa-tag" />
          <v-icon name="fa-ellipsis-v" /> -->
        </div>
      </div>
      <div class="my-2 flex w-full sm:flex-col gap-1 sm:gap-3 px-2">
        <SearchBox />
        <AddNoteButton />
      </div>
    </div>
    <div class="h-auto max-h-[25vh] sm:max-h-none sm:h-[75%] overflow-y-auto overflow-x-clip">
      <span v-if="notesLoading" class="px-4"> Loading... </span>
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
const {
  filteredNotes: notes,
  notesLoading,
  selectedCategoryName,
} = storeToRefs(notesStore);

const handleClickRefreshNotes = async () => {
  await notesStore.getNotes();
};

const handleClearFilters = () => {
  notesStore.clearFilters();
};
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: rgb(230, 239, 253) #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(230, 239, 253);
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>
