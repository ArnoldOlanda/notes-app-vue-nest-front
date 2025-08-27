<template>
    <div class="flex flex-col bg-base-100 px-6 py-4 h-full">
        <div v-if="selectedNote" class="relative h-full">
            <div>
                <div class="flex items-center mb-4">
                    <select class="select select-bordered select-xs w-36" v-model="form.category">
                        <option :value="category.id" v-for="category in categories" :key="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <div
                        id="toolbar"
                        class="flex gap-5 items-center text-gray-400 w-full h-10"
                    >
                        <!-- <div class="w-[25px] h-[25px] ml-4 bg-lime-400 rounded-full" /> -->
                        
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
                        <div class="flex gap-2">
                            <button class="ql-link"><v-icon name="fa-link" /></button>
                            <button class="ql-image"><v-icon name="fa-image" /></button>
                        </div>
                        <div v-show="selectedNote.id" class="tooltip tooltip-bottom" data-tip="Delete note">
                            <button 
                                class="btn btn-circle btn-soft btn-sm text-red-500"
                                @click="deleteNote"
                            >
                                <v-icon name="fa-trash-alt"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-start">
                    <h3
                        class="text-2xl font-bold"
                        @click="handleClickEditTitle"
                        v-show="!isEditing"
                    >
                        {{ form.title }}
                    </h3>
                    <input
                        v-show="isEditing"
                        ref="inputNoteTitleRef"
                        class="input text-2xl p-0 text-uppercase font-bold"
                        type="text"
                        v-model="form.title"
                        @blur="isEditing = false"
                    />
                </div>
            </div>
            <div class="flex justify-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-sm m-1">
                        <v-icon name="fa-tag"/> {{ $t('note_detail.labels.tags') }}
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li v-for="tag in tags" :key="tag.id">
                            <a @click="addTag(tag)">
                                {{ tag.name }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="flex gap-2 items-center ms-4">
                    <span v-for="tag in form.tags" class="relative text-base-content cursor-pointer flex gap-1 bg-base-300 rounded-full px-2 py-1">
                        # {{ tag.name }}
                        <span class="hover:bg-gray-200 transition-all w-6 h-6 rounded-full flex justify-center items-center">
                            <v-icon name="fa-times" @click="form.tags = form.tags.filter(t => t.id !== tag.id)" />
                        </span>
                    </span>
                </div>
            </div>
            <quill-editor
                class="h-[calc(100%-200px)] mt-2"
                :value="form.description"
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
                    :disabled="!form.description"
                    @click="saveNote"
                >
                    <v-icon name="fa-save" />
                    {{ currentMode === "edit" ? "Update" : "Save" }} note
                </button>
            </div>
        </div>
        <div
            v-else
            class="text-gray-500 h-full justify-center gap-8 flex flex-col items-center"
        >
            <not-selected-note-ilustration />
            {{ $t('note_detail.labels.choose_a_note') }}
        </div>
    </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { quillEditor } from "vue3-quill";
import { useMutation } from "@vue/apollo-composable";

import { useAuthStore, useNotesStore } from "../../store";
import NotSelectedNoteIlustration from "./NotSelectedNoteIlustration.vue";
import { confirm, swal } from "../commom/customSwal";
import { notesAdapter } from "../../adapters/notes.adapter";
import { CREATE_NOTE_MUTATION } from "../../graphql/mutations/createNote.mutation";
import { UPDATE_NOTE_MUTATION } from "../../graphql/mutations/updateNote.mutation";

import "vue3-quill/lib/vue3-quill.css";
import { DELETE_NOTE_MUTATION } from "../../graphql/mutations/deleteNote.mutation";

const notesStore = useNotesStore();
const authStore = useAuthStore();
const { selectedNote, currentMode, tags, categories } = storeToRefs(notesStore);

const { 
    mutate: createNoteMutation, 
    loading: createNoteLoading 
} = useMutation(CREATE_NOTE_MUTATION)

const { 
    mutate: updateNoteMutation, 
    loading: updateNoteLoading 
} = useMutation(UPDATE_NOTE_MUTATION)

const {
    mutate: deleteNoteMutation,
    loading: deleteNoteLoading
} = useMutation(DELETE_NOTE_MUTATION);

const state = reactive({
    editorOption: {
        placeholder: "",
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

const form = reactive({
    title: selectedNote.value?.title,
    description: selectedNote.value?.description,
    category: selectedNote.value?.category,
    tags: selectedNote.value?.tags,
});

const isEditing = ref(false);
const inputNoteTitleRef = ref(null);
const isInputTagOpen = ref(false);

watch(selectedNote, (value) => {
    if(value){
        form.title = value.title;
        form.description = value.description;
        form.category = value.category;
        form.tags = value.tags;
    }
});

const onEditorChange = ({ quill, html, text }) => {
    form.description = html;
};

const handleClickEditTitle = () => {
    isEditing.value = true; 
    nextTick(() => {
        inputNoteTitleRef.value.focus();
    });
};

const saveNote = async () => {
    if(!form.title || !form.description || !form.category){
        swal({
            title: "Error",
            text: "Please complete all required fields",
            icon: "error",
        });
        return;
    }
    // console.log(form);
    // return;
    
    try { 
        if(currentMode.value === "edit"){
            const result = await updateNoteMutation({
                noteId: selectedNote.value.id,
                updateNoteInput: {
                    title: form.title,
                    description: form.description,
                    categoryId: +form.category,
                    tagIds: form.tags.map(tag => tag.id),
                    date: selectedNote.value.date,
                }
            });

            if(result?.data?.updateNote){
                swal({
                    title: "Success",
                    text: "Note updated successfully",
                    icon: "success",
                });
            }
        } else {
            const result = await createNoteMutation({
                userId: authStore.authState.user.id,
                createNoteInput: {
                    title: form.title,
                    description: form.description,
                    date: new Date().toISOString().split('T')[0],
                    categoryId: +form.category,
                    tagIds: form.tags.map(tag => tag.id)
                }
            })

            if(result?.data?.createNote){
                swal({
                    title: "Success",
                    text: "Note saved successfully",
                    icon: "success",
                });
            }
        }
        notesStore.setLoading(true);
        await Promise.all([
            notesStore.getNotes(),
            notesStore.refetchNotesCounts()
        ])
        notesStore.setSelectedNote(null);

    } catch (error) {
        console.log(error);
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
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
        
        const id = selectedNote.value.id;
        const result = await deleteNoteMutation({ id });

        // console.log(result);
        
        if(result?.data?.deleteNote){
            swal({
                title: "Success",
                text: "Note deleted successfully",
                icon: "success",
            });
        }

        selectedNote.value = null;

        await Promise.all([
            notesStore.getNotes(),
            notesStore.refetchNotesCounts()
        ]);

    } catch (error) {
        console.log(error);
        swal({
            title: "Error",
            text: "An error occurred while deleting the note",
            icon: "error",
        })
    }
}

const addTag = (tag) => {
    if(form.tags.find(t => t.id === tag.id)) {
        form.tags = form.tags.filter(t => t.id !== tag.id);
        return;
    };
    form.tags.push(tag);
};

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
