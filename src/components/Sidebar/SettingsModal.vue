<template>
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
            <label for="settingsModal" class="btn btn-primary btn-sm text-white">
                {{ $t('actions.close') }}
            </label>
        </template>
    </modal>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useConfigStore } from '../../store/config/useConfigStore';
import Modal from '../commom/Modal.vue';

const configStore = useConfigStore();
const { locale }  = useI18n();

const changeLocale = async ({target}) => {
    locale.value = target.value;
    configStore.setConfig({language: target.value});
};

</script>

<style lang="scss" scoped>

</style>