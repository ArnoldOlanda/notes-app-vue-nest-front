<template>
    <div
        class="px-8 py-5 border-base-300 border-y-[1px] cursor-pointer hover:bg-base-300 transition-colors"
        @click="handleClickNote"
    >
        <div class="flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <div class="text-[12px] text-neutral-400">{{ note.category.name }}</div>
                <div class="flex gap-2 items-center">
                    <div class="text-[12px] text-neutral-400">{{ new Date(note.date).toLocaleDateString() }}</div>
                    <div>
                        <Dropdown icon="fa-ellipsis-v" class="text-neutral-400" left bottom>
                            <dropdown-item 
                                icon="fa-trash" @click.stop="handleClickDelete(note.id)"
                                class-name="hover:text-red-500"
                            >
                                {{ $t('actions.delete') }}
                            </dropdown-item>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <!-- Tags as chips -->
            <div v-if="note.tags && note.tags.length" class="flex flex-wrap gap-1 mt-1">
                <small 
                    v-for="tag in note.tags" 
                    :key="tag.id"
                    class="px-2 py-0.5 text-[10px] bg-blue-100 text-gray-600 rounded-full border border-gray-200"
                >
                    {{ tag.name }}
                </small>
            </div>
        </div>
        <div class="flex flex-col items-start text-left mt-1">
            <span class="font-bold">{{ note.title }}</span>
            <p 
                class="text-sm text-base-content" 
                v-html="note.description.length > 100 
                    ? note.description.slice(0, 100) + '...' 
                    : note.description
                "
            >
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "../../store";
import Dropdown from "../Sidebar/Dropdown.vue";
import DropdownItem from "../Sidebar/DropwdownItem.vue";

const props = defineProps({
    noteData: {
        type: Object,
        required: true,
    },
});

const notesStore = useNotesStore();
const note = ref(props.noteData);

const handleClickNote = () => {
    const noteValue = {
        ...note.value,
        category: note.value.category.id,
        tags: note.value.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    };
    notesStore.setSelectedNote(noteValue);
    notesStore.setCurrentMode("edit");
};

const handleClickDelete = async (id) =>{
    if(!id) return;
    if(note.value.active){
        await notesStore.moveToTrash(id); // Mover a la papelera
    }else{
        await notesStore.deleteNote(id); // Eliminar permanentemente
    }
}

</script>

<style></style>
