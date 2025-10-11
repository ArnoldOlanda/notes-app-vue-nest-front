<template>
    <modal id="profileModal" close-on-click-outside>
        <template #title>
            <h3 class="text-lg font-bold">
                {{ $t('sidebar.options.profile') }}
            </h3>
        </template>
        
        <template #content>
            <div class="grid grid-cols-1 gap-4 pt-4">
                <!-- Avatar y nombre -->
                <div class="flex flex-col items-center mb-4">
                    <div class="relative mb-4">
                        <img
                            :src="authState.user.avatar || '/default-avatar.png'"
                            :alt="authState.user.name"
                            class="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
                        />
                        <!-- Botón de edición en esquina inferior derecha -->
                        <button 
                            @click="openAvatarUpload"
                            class="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 border-2 border-white"
                            :disabled="uploadingAvatar"
                            :title="$t('profile.changePhoto')"
                        >
                            <v-icon v-if="!uploadingAvatar" name="fa-pen" class="text-xs" />
                            <span v-if="uploadingAvatar" class="loading loading-spinner loading-xs"></span>
                        </button>
                        <!-- Input file oculto -->
                        <input
                            ref="avatarInput"
                            type="file"
                            accept="image/*"
                            @change="handleAvatarUpload"
                            class="hidden"
                        />
                    </div>
                    <h3 class="text-lg font-medium">
                        {{ authState.user.name }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ authState.user.email }}
                    </p>
                </div>

                <!-- Información del usuario -->
                <div class="space-y-3">
                    <!-- Nombre -->
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium">
                            {{ $t('profile.name') }}:
                        </span>
                        <span class="text-sm">
                            {{ authState.user.name }}
                        </span>
                    </div>

                    <!-- Email -->
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium">
                            {{ $t('profile.email') }}:
                        </span>
                        <span class="text-sm">
                            {{ authState.user.email }}
                        </span>
                    </div>
                    
                    <!-- Fecha de registro (si está disponible) -->
                    <div v-if="authState.user.createdAt" class="flex justify-between items-center">
                        <span class="text-sm font-medium">
                            {{ $t('profile.member_since') }}:
                        </span>
                        <span class="text-sm text-gray-500">
                            {{ formatDate(authState.user.createdAt) }}
                        </span>
                    </div>

                    <!-- Social provider (si aplica) -->
                    <div v-if="authState.user.social_provider" class="text-center text-base-content/30">
                        <span class="text-sm">
                            {{ $t('profile.loginWith',{provider:authState.user.social_provider}) }}
                        </span>
                    </div>

                </div>

                <!-- Acciones -->
                <div class="flex flex-col gap-3 mt-4">
                    <button 
                        @click="editProfile"
                        class="btn btn-primary btn-sm text-white w-full"
                    >
                        <v-icon name="fa-edit" class="mr-2" />
                        {{ $t('actions.edit') }} {{ $t('sidebar.options.profile') }}
                    </button>
                </div>
            </div>
        </template>

        <template #actions>
            <label for="profileModal" class="btn">
                {{ $t('actions.close') }}
            </label>
        </template>
    </modal>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store';
import { mixin } from '../commom/customSwal';
import { notesApi } from '../../api';
import Modal from '../commom/Modal.vue';

// Store
const authStore = useAuthStore();
const { authState } = storeToRefs(authStore);

// State
const avatarInput = ref(null);
const uploadingAvatar = ref(false);

// Methods
const editProfile = () => {
    // TODO: Implementar edición de perfil
    console.log('Editar perfil');
    // Cerrar el modal después de la acción
    document.getElementById('profileModal')?.close();
};

const openAvatarUpload = () => {
    avatarInput.value?.click();
};

const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
        mixin({
            title: 'Por favor selecciona un archivo de imagen válido',
            icon: 'error'
        });
        return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
        mixin({
            title: 'La imagen no puede ser mayor a 5MB',
            icon: 'error'
        });
        return;
    }

    uploadingAvatar.value = true;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'avatars');

        const response = await notesApi.post('/auth/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Actualizar el avatar en el store
        authStore.updateUserAvatar(response.data.url);

        mixin({
            title: 'Foto de perfil actualizada correctamente',
            icon: 'success'
        });

    } catch (error) {
        console.error('Error al subir avatar:', error);
        mixin({
            title: error.response?.data?.message || 'Error al actualizar la foto de perfil',
            icon: 'error'
        });
    } finally {
        uploadingAvatar.value = false;
        // Limpiar el input
        if (avatarInput.value) {
            avatarInput.value.value = '';
        }
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
};
</script>

<style scoped>

</style>