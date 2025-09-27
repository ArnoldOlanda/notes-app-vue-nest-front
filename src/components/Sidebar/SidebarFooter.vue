<template>
    <div class="flex justify-between items-center my-6 px-10">
        <div class="flex gap-3 items-center">
            <v-icon name="fa-align-left" />
            <span>Notes App</span>
        </div>
        <dropdown icon="fa-angle-right" class-name="w-48" right end>
            <dropdown-item icon="fa-cog">
                <label for="settingsModal">
                    {{ $t('sidebar.options.settings') }}
                </label>
            </dropdown-item>

            <dropdown-item icon="fa-info-circle">
                <label for="aboutModal">
                    {{ $t('settings.about') }}
                </label>
            </dropdown-item>

            <dropdown-item icon="fa-shield-alt">
                <label for="privacyPolicyModal">
                    {{ $t('settings.privacy_policy') }}
                </label>
            </dropdown-item>

            <dropdown-item icon="fa-sign-out-alt" @click="logout">
                {{ $t('sidebar.options.logout') }}
            </dropdown-item>
        </dropdown>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store';
import { confirm } from '../commom/customSwal';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropwdownItem.vue';

const store = useAuthStore();
const router = useRouter();

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

</script>
