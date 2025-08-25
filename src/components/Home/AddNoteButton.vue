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
import { useI18n } from "vue-i18n";
import { useNotesStore } from "../../store";

const notesStore = useNotesStore();
const {t} = useI18n();

const handleClickAddNote = () => {
  notesStore.setSelectedNote({
    title: t("note_detail.labels.title"),
    description: "",
    category: "1",
    tags: [],
  });
  notesStore.setCurrentMode("create");
};
</script>

<style lang="scss" scoped></style>
