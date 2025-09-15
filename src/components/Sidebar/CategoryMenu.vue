<template>
    <menu-item :label="t('sidebar.menus.category')" :openModal="showCategoriesModal" open>
        <template #modal>
            <dialog id="categoriesModal" class="modal">
                <div class="modal-box text-base-content">
                    <h3 class="text-lg font-bold">
                        {{ $t('sidebar.labels.create_category') }}
                    </h3>
                    <div class="flex flex-col gap-2 py-4">
                        <div class="text-left">{{ $t('sidebar.labels.name') }}</div>
                        <input type="text" class="input input-bordered input-primary"
                            v-model="newCategoryName" />
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn btn-sm">
                                {{ $t('actions.close') }}
                            </button>
                        </form>
                        <button class="btn btn-primary btn-sm" @click="handleSubmit">
                            {{ mode === "create" ? $t('actions.create') : $t('actions.update') }}
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
                class="pl-10 pr-4 py-3 w-full text-blue-200 flex justify-between group hover:bg-primary-hover cursor-pointer"
                :class="{
                    'bg-primary-active': filters.category === category.id,
                }"
            >
                <span class="text-left">{{ category.category }} </span>
                <div class="flex">
                    <span
                        class="w-8 h-6 rounded-xl text-sm flex items-center justify-center group-hover:counter-focus"
                        :class="{
                            'counter-focus':
                                filters.category === category.id,
                        }">
                        {{ category.count }}
                    </span>
                    <dropdown 
                        icon="fa-ellipsis-v" 
                        class-name="w-48"
                        icon-wrapper-class-name="group-hover:opacity-100 opacity-0 transition-all" 
                        right
                    >
                        <dropdown-item icon="fa-edit" @click="handleUpdate(category)">
                            {{ $t('actions.edit') }}
                        </dropdown-item>
                        <dropdown-item icon="fa-trash" @click="handleDeleteCategory(category.id)">
                            {{ $t('actions.delete') }}
                        </dropdown-item>
                    </dropdown>
                </div>
            </div>
        </template>
    </menu-item>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation } from '@vue/apollo-composable';
import { useI18n } from 'vue-i18n';
import { confirm, mixin } from '../commom/customSwal';
import { useAuthStore, useNotesStore } from '../../store';
import { CREATE_CATEGORY_MUTATION } from '../../graphql/mutations/createCategory.mutation';
import { UPDATE_CATEGORY_MUTATION } from '../../graphql/mutations/updateCategory.mutation';
import { DELETE_CATEGORY_MUTATION } from '../../graphql/mutations/deleteCategory.mutation';
import MenuItem from '../Home/MenuItem.vue';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropwdownItem.vue';

const store = useAuthStore();
const notesStore = useNotesStore();
const {t} = useI18n();

const { authState } = storeToRefs(store);
const { notesCategoriesWithCount, filters } = storeToRefs(notesStore);

const mode = ref("create"); // create, update
const idCategory = ref(null);
const newCategoryName = ref("");

const { mutate: createCategoryMutation } = useMutation(CREATE_CATEGORY_MUTATION);
const { mutate: updateCategoryMutation } = useMutation(UPDATE_CATEGORY_MUTATION);
const { mutate: deleteCategoryMutation } = useMutation(DELETE_CATEGORY_MUTATION);


const showCategoriesModal = (e) => {
    document.getElementById("categoriesModal")?.showModal();
};

const handleSubmit  = async () => {
    try {
        if (!newCategoryName.value.trim()) {
            // Optionally, show an error message to the user
            mixin({
                title: "Please enter a name for the category",
                icon: "error",
            });
            return;
        }

        if (mode.value === "create") await createCategory();
        else await updateCategory();

        notesStore.refetchNotesCounts();
        notesStore.reloadCategories(authState.value.user.id);

        mode.value = "create";
        idCategory.value = null;
        newCategoryName.value = ""; // Clear the input
        document.getElementById("categoriesModal")?.close();

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
    idCategory.value = data.id;
    newCategoryName.value = data.category;

    showCategoriesModal();
}

const createCategory = async () => {
    const result = await createCategoryMutation({
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
    }
};

const updateCategory = async () => {
    const result = await updateCategoryMutation({
        id: idCategory.value,
        data: {
            name: newCategoryName.value,
        },
    });

    if (result.data?.updateCategory) {
        mixin({
            title: "Success!, Category updated successfully!",
            icon: "success",
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
            notesStore.reloadCategories(authState.value.user.id);
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