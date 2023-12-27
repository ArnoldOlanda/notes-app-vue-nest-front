<template>
    <div class="flex flex-col bg-white p-10">
        <div>
            <div v-if="selectedNote">
                <div>
                    <div
                        id="toolbar"
                        class="flex gap-5 items-center text-gray-400 w-full h-10"
                    >
                        <div class="flex gap-3">
                            <div
                                class="w-[25px] h-[25px] bg-lime-400 rounded-full"
                            />
                            <select class="w-28">
                                <option value="">General</option>
                            </select>
                        </div>

                        <div class="flex gap-2">
                            <button class="ql-bold">
                                <v-icon name="fa-bold" />
                            </button>
                            <button class="ql-italic">
                                <v-icon name="fa-italic" />
                            </button>
                            <button class="ql-underline">
                                <v-icon name="fa-underline" />
                            </button>
                        </div>

                        <div class="flex gap-2">
                            <button class="ql-link">
                                <v-icon name="fa-link" />
                            </button>
                            <button class="ql-list" value="bullet">
                                <v-icon name="fa-list-ul" />
                            </button>
                        </div>

                        <div class="flex gap-2">
                            <button class="ql-align">
                                <v-icon name="fa-align-left" />
                            </button>
                            <button class="ql-align" value="center">
                                <v-icon name="fa-align-center" />
                            </button>
                            <button class="ql-align" value="right">
                                <v-icon name="fa-align-right" />
                            </button>
                        </div>
                    </div>
                    <div class="w-full flex justify-start">
                        <h3 class="text-2xl font-bold">
                            {{ selectedNote.title }}
                        </h3>
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
            </div>
            <div v-else class="text-gray-500">Seleccione una nota</div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import { quillEditor } from "vue3-quill";
import "vue3-quill/lib/vue3-quill.css";
import { useNotesStore } from "../../store";
import { storeToRefs } from "pinia";

export default {
    name: "App",
    components: { quillEditor },
    setup() {
        const state = reactive({
            content: "<p>2333</p>",
            _content: "",
            editorOption: {
                placeholder: "core",
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
        const notesStore = useNotesStore();

        // const { selectedNote } = notesStore;
        const { selectedNote } = storeToRefs(notesStore);

        const onEditorBlur = (quill) => {
            //console.log("editor blur!", quill);
        };
        const onEditorFocus = (quill) => {
            //console.log("editor focus!", quill);
        };
        const onEditorReady = (quill) => {
            //console.log("editor ready!", quill);
        };
        const onEditorChange = ({ quill, html, text }) => {
            //console.log("editor change!", quill, html, text);
            state.content = html;
        };

        // setTimeout(() => {
        //     state.disabled = true;
        // }, 2000);

        return {
            state,
            selectedNote,
            onEditorBlur,
            onEditorFocus,
            onEditorReady,
            onEditorChange,
        };
    },
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
