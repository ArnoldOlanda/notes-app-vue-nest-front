<template>
    <div class="flex flex-col bg-white p-10 h-full">
        <div v-if="selectedNote" class="relative h-full">
            <div>
                <div class="flex items-center mb-4">
                    <select class="select select-bordered w-36" v-model="selectedCategory">
                        <option :value="category.id" v-for="category in categories" :key="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <div
                        id="toolbar"
                        class="flex gap-5 items-center text-gray-400 w-full h-10"
                    >
                        <div class="w-[25px] h-[25px] ml-4 bg-lime-400 rounded-full" />
                        
                        <div class="flex gap-2">
                            <button class="ql-bold"><v-icon name="fa-bold" /></button>
                            <button class="ql-italic"><v-icon name="fa-italic" /></button>
                            <button class="ql-underline"><v-icon name="fa-underline" /></button>
                        </div>

                        <div class="flex gap-2">
                            <button class="ql-link"><v-icon name="fa-link" /></button>
                            <button class="ql-list" value="bullet"><v-icon name="fa-list-ul" /></button>
                        </div>

                        <div class="flex gap-2">
                            <button class="ql-align"><v-icon name="fa-align-left" /></button>
                            <button class="ql-align" value="center"><v-icon name="fa-align-center" /></button>
                            <button class="ql-align" value="right"><v-icon name="fa-align-right" /></button>
                        </div>
                    </div>
                    <div v-show="selectedNote.id" class="tooltip tooltip-bottom" data-tip="Delete note">
                        <button 
                            class="btn btn-circle btn-error btn-sm text-white"
                            :disabled="!state.content"
                            @click="deleteNote"
                        >
                            <v-icon name="fa-trash-alt"/>
                        </button>
                    </div>
                </div>
                <div class="w-full flex justify-start">
                    <h3
                        class="text-2xl font-bold"
                        @click="handleClickEditTitle"
                        v-show="!isEditing"
                    >
                        {{ selectedNote.title }}
                    </h3>
                    <input
                        v-show="isEditing"
                        ref="inputNoteTitleRef"
                        class="input input-bordered text-xl text-uppercase font-bold"
                        type="text"
                        v-model="noteTitle"
                        @blur="isEditing = false"
                    />
                </div>
            </div>
            <quill-editor
                :value="selectedNote.description"
                :options="state.editorOption"
                :disabled="state.disabled"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)"
            />
            <div class="absolute right-0 bottom-0">
                <button 
                    class="bg-blue-500 p-2 text-white rounded-md w-40 shadow-lg disabled:bg-blue-200 disabled:shadow-none"
                    :disabled="!state.content"
                    @click="saveNote"
                >
                    <v-icon name="fa-save" />
                    Save note
                </button>
            </div>
        </div>
        <div
            v-else
            class="text-gray-500 h-full justify-center gap-8 flex flex-col items-center"
        >
            <not-selected-note-ilustration />
            Choose a note
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { quillEditor } from "vue3-quill";

import { useAuthStore, useNotesStore } from "../../store";
import NotSelectedNoteIlustration from "./NotSelectedNoteIlustration.vue";
import { deleteNoteService, getNotesService, postNoteService } from "../../services/notes.service";
import { confirm, swal } from "../commom/customSwal";
import { notesAdapter } from "../../adapters/notes.adapter";
import { getCategoriesService } from "../../services/categories.service";

import "vue3-quill/lib/vue3-quill.css";

const state = reactive({
    content: "",
    _content: "",
    editorOption: {
        placeholder: "Write something...",
        modules: {
            toolbar: "#toolbar",
            // toolbar: [
            //     ["bold", "italic", "underline"],
            //     // ["blockquote", "code-block"],
            //     // [{ header: 1 }, { header: 2 }],
            //     [{ list: "bullet" }],
            //     // [{ script: "sub" }, { script: "super" }],
            //     // [{ indent: "-1" }, { indent: "+1" }],
            //     // [{ direction: "rtl" }],
            //     [{ size: ["small", false, "large", "huge"] }],
            //     // [{ header: [1, 2, 3, 4, 5, 6, false] }],
            //     // [{ color: [] }, { background: [] }],
            //     // [{ font: [] }],
            //     [{ align: [] }],
            //     ["clean"],
            //     ["link", "image", "video"],
            // ],
        },
        // more options
    },
    disabled: false,
});

const isEditing = ref(false);

const notesStore = useNotesStore();
const authStore = useAuthStore();

const inputNoteTitleRef = ref(null);
const noteTitle = ref("");
const categories = ref([]);
const { selectedNote } = storeToRefs(notesStore);

const selectedCategory = ref(selectedNote.value?.category);


watch(selectedNote, (value) => {
    if(value){
        selectedCategory.value = value.category;
        noteTitle.value = value.title;
    }
});

onMounted(() => {
    getCategories();
});

const onEditorChange = ({ quill, html, text }) => {
    //console.log("editor change!", quill, html, text);
    state.content = html;
};

const handleClickEditTitle = () => {
    isEditing.value = true;    
    inputNoteTitleRef.value.focus();
};

const saveNote = async () => {
    if(!selectedNote.value.title || !state.content) {
        swal({
            title: "Error",
            text: "Please fill all required fields",
            icon: "error",
        });
        return;
    }
    try { 
        await postNoteService(authStore.authState.user.id,{
            title: noteTitle.value,
            description: state.content,
            category: `${selectedCategory.value}`,
            date: new Date().toISOString(),
        });
        swal({
            title: "Success",
            text: "Note saved successfully",
            icon: "success",
        });
        const notes = await getNotesService(authStore.authState.user.id);
        notesStore.setNotes(notesAdapter(notes));
    } catch (error) {
        swal({
            title: "Error",
            text: "An error occurred while saving the note",
            icon: "error",
        })
        console.log(error);
    }
}

const deleteNote = async () =>{
    try {
        const {isConfirmed} = await confirm({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No, cancel",
        })
        if(!isConfirmed) return;
        await deleteNoteService(selectedNote.value.id);
        swal({
            title: "Success",
            text: "Note deleted successfully",
            icon: "success",
        });
        selectedNote.value = null;
        const notes = await getNotesService(authStore.authState.user.id);
        notesStore.setNotes(notesAdapter(notes));
    } catch (error) {
        swal({
            title: "Error",
            text: "An error occurred while deleting the note",
            icon: "error",
        })
        console.log(error);
    }
}

const getCategories = async () =>{
    try {
        const data = await getCategoriesService();
        categories.value = data;
    } catch (error) {
        console.log(error);
    }
}

// setTimeout(() => {
//     state.disabled = true;
// }, 2000);

const onEditorBlur = (quill) => {
    //console.log("editor blur!", quill);
};
const onEditorFocus = (quill) => {
    //console.log("editor focus!", quill);
};
const onEditorReady = (quill) => {
    //console.log("editor ready!", quill);
};
</script>

<style>
.ql-stroke {
    stroke: rgb(157, 159, 167) !important;
}

.ql-container.ql-snow {
    border: none !important;
}

#toolbar {
    border: none !important;
}
</style>
