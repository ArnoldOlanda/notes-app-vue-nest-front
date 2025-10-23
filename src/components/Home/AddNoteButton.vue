<template>
  <div class="mx-0 sm:mx-8 items-center hidden sm:flex">
    <button
      class="btn btn-primary btn-sm w-full rounded text-white"
      @click="handleClickAddNote"
    >
      <v-icon name="fa-plus" scale="0.6"/>
      <span class="ml-1 text-xs sm:text-sm">
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
    description_html: "",
    category: "1",
    tags: [],
  });
  notesStore.setCurrentMode("create");
};
</script>

<style lang="scss" scoped></style>
