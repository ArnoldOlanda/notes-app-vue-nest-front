<template>
    <div class="flex justify-between items-center my-6 px-10">
        <div class="flex gap-3 items-center">
            <v-icon name="fa-align-left" />
            <span>Notes App</span>
        </div>
        <dropdown icon="fa-angle-right" class-name="w-48" right end>
            <dropdown-item icon="fa-cog" @click="showSettingsModal">
                {{ $t('sidebar.options.settings') }}
            </dropdown-item>

            <dropdown-item icon="fa-info-circle" @click="showAboutModal">
                {{ $t('settings.about') }}
            </dropdown-item>

            <dropdown-item icon="fa-shield-alt" @click="showPrivacyPolicyModal">
                {{ $t('settings.privacy_policy') }}
            </dropdown-item>

            <dropdown-item icon="fa-sign-out-alt" @click="logout">
                {{ $t('sidebar.options.logout') }}
            </dropdown-item>
        </dropdown>

        <modal id="settingsModal">
            <template #title>
                <h3 class="text-lg font-bold">
                    {{ $t('settings.title') }}
                </h3>
            </template>
            
            <template #content>
                <div class="grid grid-cols-1 gap-4 pt-4">
                    <div class="flex flex-col gap-1">
                        <label for="" class=" text-left font-semibold">{{ $t('settings.language') }}:</label>
                        <select 
                            class="select select-bordered" 
                            :value="locale" 
                            @change="changeLocale"
                        >
                            <option disabled selected>Select Language</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                </div>
            </template>

            <template #actions>
                <button class="btn btn-primary btn-sm text-white">
                    {{ $t('actions.close') }}
                </button>
            </template>
        </modal>

        <about-modal />

        <privacy-policy-modal />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store';
import { useConfigStore } from '../../store/config/useConfigStore';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropwdownItem.vue';
import { confirm } from '../commom/customSwal';
import Modal from '../commom/Modal.vue';
import AboutModal from './AboutModal.vue';
import PrivacyPolicyModal from './PrivacyPolicyModal.vue';

const store = useAuthStore();
const router = useRouter();

const configStore = useConfigStore();
const { locale }  = useI18n();

const {config} = storeToRefs(configStore);

const changeLocale = async ({target}) => {
    locale.value = target.value;
    configStore.setConfig({language: target.value});
};

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

const showSettingsModal = (e) => {
    document.getElementById("settingsModal")?.showModal();
};

const showAboutModal = (e) => {
    document.getElementById("aboutModal")?.showModal();
};

const showPrivacyPolicyModal = (e) => {
    document.getElementById("privacyPolicyModal")?.showModal();
};

</script>
