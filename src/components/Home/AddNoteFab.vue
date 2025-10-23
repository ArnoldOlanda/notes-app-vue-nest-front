<template>
  <button
    @click="handleClickAddNote"
    class="fixed bottom-6 right-6 z-40 btn btn-circle btn-primary shadow-2xl transition-all sm:hidden"
    :aria-label="$t('notes_list.add_note')"
  >
    <v-icon name="fa-plus" scale="1" class="text-white" />
  </button>
</template>

<script setup>
import { defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import { useNotesStore } from "../../store";

const emit = defineEmits(['click']);

const notesStore = useNotesStore();
const { t } = useI18n();

const handleClickAddNote = () => {
  notesStore.setSelectedNote({
    title: t("note_detail.labels.title"),
    description: "",
    description_html: "",
    category: "1",
    tags: [],
  });
  notesStore.setCurrentMode("create");
  emit('click');
};
</script>

<style scoped>

.btn-lg {
  font-size: 1.5rem;
}
</style>
