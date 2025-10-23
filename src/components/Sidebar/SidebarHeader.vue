<template>
    <div class="flex justify-between items-center p-10 pt-20 sm:pt-10">
        <div class="flex gap-2 items-center">
            <img
                :src="authState.user.avatar"
                alt="profile_photo"
                class="w-8 h-8 rounded-full"
            />
        <span>{{ authState.user.name }}</span>
        </div>
        
        <dropdown icon="fa-ellipsis-v" class-name="w-48" bottom>
            <dropdown-item icon="fa-user">
                <label for="profileModal">
                    {{ $t('sidebar.options.profile') }}
                </label>
            </dropdown-item>

            <dropdown-item icon="fa-user-lock">
                <label for="changePasswordModal">
                    {{ $t('sidebar.options.changePassword') }}
                </label>
            </dropdown-item>
        </dropdown>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '../../store';
import Dropdown from "../Sidebar/Dropdown.vue";
import DropdownItem from "../Sidebar/DropwdownItem.vue";

const store = useAuthStore();
const { authState } = storeToRefs(store);

const openChangePasswordModal = () => {
    document.getElementById('changePasswordModal')?.showModal();
};

</script>

<style lang="scss" scoped>

</style>