<template>
    <div class="flex justify-between items-center my-6 px-10">
        <div class="flex gap-3 items-center">
            <v-icon name="fa-align-left" />
            <span>Notes App</span>
        </div>
        <dropdown icon="fa-angle-right" class-name="w-48" right end>
            <dropdown-item icon="fa-cog" @click="showSettingsModal">
                {{ $t('siderbar.options.settings') }}
            </dropdown-item>

            <dropdown-item icon="fa-sign-out-alt" @click="logout">
                {{ $t('siderbar.options.logout') }}
            </dropdown-item>
        </dropdown>

        <dialog id="settingsModal" class="modal">
            <div class="modal-box text-black">
                <h3 class="text-lg font-bold">
                    {{ $t('settings.title') }}
                </h3>
                <div class="grid grid-cols-1 gap-4 pt-4">
                    <div class="flex flex-col gap-1">
                        <label for="" class=" text-left font-semibold">{{ $t('settings.language') }}:</label>
                        <select 
                            class="select select-bordered" 
                            :value="currentLocale" 
                            @change="changeLocale"
                        >
                            <option disabled selected>Select Language</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                    <div class="flex items-center">
                        <toggle-theme/>
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary btn-sm">
                            Close
                        </button>
                    </form>
                    <!-- <button 
                        class="btn btn-primary btn-sm" 
                        @click="saveChanges"
                        :disabled="newLocale === currentLocale"
                    >
                        Save
                    </button> -->
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropwdownItem.vue';
import { confirm, mixin } from '../commom/customSwal';
import ToggleTheme from './ToggleTheme.vue';
import { useI18n } from 'vue-i18n';

const store = useAuthStore();
const router = useRouter();
const { locale }  = useI18n();

const currentLocale = ref(locale.value);

const changeLocale = async ({target}) => {
    currentLocale.value = target.value;
    locale.value = target.value;
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

</script>
