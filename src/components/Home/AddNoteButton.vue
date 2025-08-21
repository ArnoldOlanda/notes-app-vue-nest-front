<template>
  <div class="mx-8">
    <button
      class="btn btn-primary btn-sm w-full rounded text-white"
      @click="handleClickAddNote"
    >
      <v-icon name="fa-plus" />
      <span class="ml-2">
        {{ $t("notes_list.add_note") }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { useNotesStore } from "../../store";

const notesStore = useNotesStore();

const handleClickAddNote = () => {
  notesStore.setSelectedNote({
    title: "Nueva nota",
    description: "",
    category: "1",
    tags: [],
  });
  notesStore.setCurrentMode("create");
};
</script>

<style lang="scss" scoped></style>
