<template>
    <div class="container bg-primary w-3/12 lg:w-1/6 text-white flex flex-col">
        <div class="flex-1">
            <div class="flex justify-between items-center p-6">
                <img
                    :src="authState.user.avatar"
                    alt="profile_photo"
                    class="w-10 h-10 rounded-full"
                />
                <span>{{ authState.user.name }}</span>
                <v-icon name="fa-ellipsis-v" />
            </div>
            <div class="w-full">
                <menu-item
                    label="CATEGORIES"
                    :openModal="showCategoriesModal"
                    open
                >
                    <template #modal>
                        <dialog id="categoriesModal" class="modal">
                            <div class="modal-box text-black">
                                <h3 class="text-lg font-bold">
                                    Create New Category
                                </h3>
                                <div class="flex flex-col gap-2 py-4">
                                    <div class="text-left">Name</div>
                                    <input
                                        type="text"
                                        class="input input-bordered input-primary"
                                        placeholder="Category Name"
                                        v-model="newCategoryName"
                                    />
                                </div>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <button class="btn btn-sm">
                                            Close
                                        </button>
                                    </form>
                                    <button
                                        class="btn btn-primary btn-sm"
                                        @click="createCategory"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </template>

                    <template #content>
                        <div
                            v-for="category in notesCategoriesWithCount"
                            :key="category.id"
                            @click="filters.category = category.id"
                            class="px-4 py-3 w-full text-blue-200 flex justify-between group hover:bg-blue-600 cursor-pointer"
                            :class="{
                                'bg-blue-600': filters.category === category.id,
                            }"
                        >
                            <span class="text-left">{{ category.category }} </span>
                            <div class="flex">
                                <span
                                    class="w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center group-hover:bg-blue-700"
                                    :class="{
                                        'bg-blue-700':
                                            filters.category === category.id,
                                    }"
                                >
                                    {{ category.count }}
                                </span>
                                <div class="dropdown dropdown-end">
                                    <div :tabindex="category.id" role="button" class="group-hover:opacity-100 opacity-0 transition-all">
                                        <v-icon name="fa-ellipsis-v"/>
                                    </div>
                                    <ul :tabindex="category.id" class="dropdown-content menu bg-base-100 text-neutral-800 rounded-md z-1 w-28 p-1 shadow-sm">
                                        <li><a href="#"><v-icon name="fa-edit" animation="wrench" hover/>Editar</a></li>
                                        <li><a href="#" @click="handleDeleteCategory(category.id)"><v-icon name="fa-trash" animation="wrench" hover/>Eliminar</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </template>
                </menu-item>
                <menu-item label="TAGS" :openModal="showTagsModal">
                    <template #modal>
                        <dialog id="tagsModal" class="modal">
                            <div class="modal-box text-black">
                                <h3 class="text-lg font-bold">
                                    Create New Tag
                                </h3>
                                <div class="flex flex-col gap-2 py-4">
                                    <div class="text-left">Name</div>
                                    <input
                                        type="text"
                                        class="input input-bordered input-primary"
                                        placeholder="Tag Name"
                                        v-model="newTagName"
                                    />
                                </div>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <button class="btn btn-sm">
                                            Close
                                        </button>
                                    </form>
                                    <button
                                        class="btn btn-primary btn-sm"
                                        @click="createTag"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </template>
                    <template #content>
                        <div
                            v-for="tag in notesTagsWithCount"
                            :key="tag.id"
                            @click="filters.tag = tag.id"
                            class="px-4 py-3 w-full text-blue-200 flex justify-between hover:bg-blue-600"
                            :class="{ 'bg-blue-600': filters.tag === tag.id }"
                        >
                            <span>{{ tag.name }} </span>
                            <span
                                class="w-8 h-6 mr-4 rounded-xl text-sm flex items-center justify-center"
                                :class="{
                                    'bg-blue-700': filters.tag === tag.id,
                                }"
                            >
                                {{ tag.count }}
                            </span>
                        </div>
                    </template>
                </menu-item>
                <!-- <menu-item label="COLORS" /> -->
                <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
            </div>
        </div>
        <div class="mb-4">
            <button class="btn" @click="logout">
                <v-icon name="fa-sign-out-alt" />
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore, useNotesStore } from "../../store";
import MenuItem from "./MenuItem.vue";
import { confirm, mixin } from "../commom/customSwal";
import { useMutation } from "@vue/apollo-composable";
import { CREATE_CATEGORY_MUTATION } from "../../graphql/mutations/createCategory.mutation";
import { CREATE_TAG_MUTATION } from "../../graphql/mutations/createTag.mutation";
import { DELETE_CATEGORY_MUTATION } from "../../graphql/mutations/deleteCategory.mutation";

const store = useAuthStore();
const router = useRouter();
const notesStore = useNotesStore();
const { notesCategoriesWithCount, notesTagsWithCount, filters } =
    storeToRefs(notesStore);
const { authState } = storeToRefs(store);

const newCategoryName = ref("");
const newTagName = ref("");

const { mutate: createCategoryMutation } = useMutation(
    CREATE_CATEGORY_MUTATION
);

const { mutate: createTagMutation } = useMutation(CREATE_TAG_MUTATION);

const { mutate: deleteCategoryMutation } = useMutation(
    DELETE_CATEGORY_MUTATION
);

const logout = async () => {
    const { isConfirmed } = await confirm({
        title: "Are you sure?",
        text: "You want to logout?",
        icon: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });

    if (!isConfirmed) return;
    store.logout();
    router.push({ name: "login" });
};

const showCategoriesModal = (e) => {
    console.log("clicked");
    const modal = document.getElementById("categoriesModal");
    if (modal) {
        modal.showModal();
    }
};

const showTagsModal = (e) => {
    console.log("clicked");
    const modal = document.getElementById("tagsModal");
    if (modal) {
        modal.showModal();
    }
};

const createCategory = async () => {
    try {
        if (!newCategoryName.value.trim()) {
            // Optionally, show an error message to the user
            mixin({
                title: "Please enter a name for the category",
                icon: "error",
            });
            return;
        }

        const result = await createCategoryMutation({
            userId: authState.value.user.id,
            createCategoryInput: {
                userId: authState.value.user.id,
                name: newCategoryName.value,
            },
        });

        if (result.data?.createCategory) {
            mixin({
                title: "Success!, Category created successfully!",
                icon: "success",
            });
            notesStore.refetchNotesCounts();
        }

        newCategoryName.value = ""; // Clear the input
        const modal = document.getElementById("categoriesModal");
        if (modal) modal.close(); // Close the modal
    } catch (error) {
        console.log(error);

        mixin({
            title: "Error",
            text: error.message,
            icon: "error",
        });
    }
};

const createTag = async () => {
    try {
        if (!newTagName.value.trim()) {
            // Optionally, show an error message to the user
            mixin({
                title: "Please enter a name for the tag",
                icon: "error",
            });
            return;
        }

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
            notesStore.refetchNotesCounts();
        }

        newTagName.value = ""; // Clear the input
        const modal = document.getElementById("tagsModal");
        if (modal) modal.close(); // Close the modal
    } catch (error) {
        console.log(error);

        mixin({
            title: "Error",
            text: error.message,
            icon: "error",
        });
    }
};

const handleDeleteCategory = async (id) => {
    
    try {
        const {isConfirmed} = await confirm({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        })

        if (!isConfirmed) return;

        const result = await deleteCategoryMutation({
            categoryId: id,
        });

        if (result.data?.deleteCategory) {
            mixin({
                title: "Success!, Category deleted successfully!",
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

onMounted(() => {});
</script>

<style></style>
