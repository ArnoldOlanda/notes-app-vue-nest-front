<template>
    <menu-item label="TAGS" :openModal="showTagsModal">
        <template #modal>
            <dialog id="tagsModal" class="modal">
                <div class="modal-box text-black">
                    <h3 class="text-lg font-bold">
                        Create New Tag
                    </h3>
                    <div class="flex flex-col gap-2 py-4">
                        <div class="text-left">Name</div>
                        <input type="text" class="input input-bordered input-primary" placeholder="Tag Name"
                            v-model="newTagName" />
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn btn-sm">
                                Close
                            </button>
                        </form>
                        <button class="btn btn-primary btn-sm" @click="handleSubmit">
                            {{ mode === "create" ? "Create" : "Update" }}
                        </button>
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </template>
        <template #content>
            <div v-for="tag in notesTagsWithCount" :key="tag.id" @click="filters.tag = tag.id"
                class="px-4 py-3 w-full text-blue-200 flex justify-between group hover:bg-blue-600 cursor-pointer"
                :class="{ 'bg-blue-600': filters.tag === tag.id }">
                <span class="text-left">{{ tag.name }} </span>
                <div class="flex">
                    <span class="w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center group-hover:bg-blue-700" 
                    :class="{
                        'bg-blue-700': filters.tag === tag.id,
                    }">
                        {{ tag.count }}
                    </span>
                    <div class="dropdown dropdown-bottom">
                        <div :tabindex="tag.id" role="button"
                            class="group-hover:opacity-100 opacity-0 transition-all" @click.stop.prevent>
                            <v-icon name="fa-ellipsis-v" />
                        </div>
                        <ul :tabindex="tag.id"
                            class="dropdown-content z-10 menu bg-base-100 text-neutral-800 rounded-md w-28 p-1 shadow-sm">
                            <li>
                                <a href="#" @click="handleUpdate(tag)">
                                    <v-icon name="fa-edit" animation="wrench" color="#262626" hover />Editar
                                </a>
                            </li>
                            <li>
                                <a href="#" @click="handleDeleteTag(tag.id)">
                                    <v-icon name="fa-trash" animation="wrench" color="#262626" hover />Eliminar
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </menu-item>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { storeToRefs } from 'pinia';
import { useAuthStore, useNotesStore } from '../../store';
import { confirm, mixin } from '../commom/customSwal';
import MenuItem from '../Home/MenuItem.vue';
import { CREATE_TAG_MUTATION } from '../../graphql/mutations/createTag.mutation';
import { UPDATE_TAG_MUTATION } from '../../graphql/mutations/updateTag.mutation';
import { DELETE_TAG_MUTATION } from '../../graphql/mutations/deleteTag.mutation';

const store = useAuthStore();
const notesStore = useNotesStore();

const { authState } = storeToRefs(store);
const { notesTagsWithCount, filters } = storeToRefs(notesStore);

const mode = ref("create"); // create, update
const idTag = ref(null);
const newTagName = ref("");

const { mutate: createTagMutation } = useMutation(CREATE_TAG_MUTATION);
const { mutate: updateTagMutation } = useMutation(UPDATE_TAG_MUTATION);
const { mutate: deleteTagMutation } = useMutation(DELETE_TAG_MUTATION);

const showTagsModal = (e) => {
    document.getElementById("tagsModal")?.showModal();
};

const handleSubmit = async () => {
    try {
        if (!newTagName.value.trim()) {
            // Optionally, show an error message to the user
            mixin({
                title: "Please enter a name for the tag",
                icon: "error",
            });
            return;
        }

        if (mode.value === "create") await createTag();
        else await updateTag();

        notesStore.refetchNotesCounts();

        idTag.value = null;
        newTagName.value = ""; // Clear the input
        document.getElementById("tagsModal")?.close();
    } catch (error) {
        console.log(error);

        mixin({
            title: "Error",
            text: error.message,
            icon: "error",
        });
    }
}

const handleUpdate = (data) => {
    console.log(data);
    
    mode.value = "update";
    idTag.value = data.id;
    newTagName.value = data.name;

    showTagsModal();
}

const createTag = async () => {

    const result = await createTagMutation({
        userId: authState.value.user.id,
        createTagInput: {
            userId: authState.value.user.id,
            name: newTagName.value,
        },
    });

    if (result.data?.createTag) {
        mixin({
            title: "Success!, Tag created successfully!",
            icon: "success",
        });
    }   
};

const updateTag = async (data) => {
    const result = await updateTagMutation({
        id: idTag.value,
        data: {
            name: newTagName.value,
        },
    });

    if (result.data?.updateTag) {
        mixin({
            title: "Success!, Tag updated successfully!",
            icon: "success",
        });
    }
};

const handleDeleteTag = async (id) => {
    
    try {
        const {isConfirmed} = await confirm({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        })

        if (!isConfirmed) return;

        const result = await deleteTagMutation({ id });

        if (result.data?.deleteTag) {
            mixin({
                title: "Success!, tag deleted successfully!",
                icon: "success",
            });
            notesStore.refetchNotesCounts();
        }
    } catch (error) {
        console.log(error);

        mixin({
            title: "Error",
            text: error.message,
            icon: "error",
        });
    }
};

</script>

<style lang="scss" scoped></style>