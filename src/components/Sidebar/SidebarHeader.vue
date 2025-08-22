<template>
    <div class="flex justify-between items-center p-10">
        <div class="flex gap-2 items-center">
            <img
                :src="authState.user.avatar"
                alt="profile_photo"
                class="w-8 h-8 rounded-full"
            />
        <span>{{ authState.user.name }}</span>
        </div>
        
        <dropdown icon="fa-ellipsis-v" class-name="w-48" bottom>
            <dropdown-item icon="fa-user" @click="$emit('profile-click')">
                {{ $t('sidebar.options.profile') }}
            </dropdown-item>

            <dropdown-item icon="fa-user-lock" @click="">
                {{ $t('sidebar.options.changePassword') }}
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
</script>

<style lang="scss" scoped>

</style>