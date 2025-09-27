<template>
    <modal id="changePasswordModal" close-on-click-outside>
        <template #title>
            <h3 class="text-lg font-bold">
                <v-icon name="fa-key" class="mr-2" />
                {{ $t('sidebar.options.changePassword') }}
            </h3>
        </template>
        
        <template #content>
            <form @submit.prevent="handleChangePassword" class="space-y-4 pt-4">
                <!-- Contraseña actual -->
                <Input 
                    v-model="form.currentPassword"
                    input-type="password"
                    :placeholder="$t('profile.currentPasswordPlaceholder')"
                    :label="$t('profile.currentPassword')"
                    :validate="v$.currentPassword"
                />

                <!-- Nueva contraseña -->
                <Input 
                    v-model="form.newPassword"
                    :label="$t('profile.newPassword')"
                    input-type="password"
                    :validate="v$.newPassword"
                    :placeholder="$t('profile.newPasswordPlaceholder')"
                />

                <!-- Confirmar nueva contraseña -->
                <Input 
                    :label="$t('profile.confirmPassword')"
                    v-model="form.confirmPassword"
                    input-type="password"
                    :validate="v$.confirmPassword"
                    :placeholder="$t('profile.confirmPasswordPlaceholder')"
                />

                <!-- Mensaje de información para usuarios de redes sociales -->
                <div v-if="authState.user.is_social_provider_login" class="alert alert-info">
                    <v-icon name="fa-info-circle" />
                    <span>{{ $t('profile.socialLoginPasswordInfo') }}</span>
                </div>
            </form>
        </template>

        <template #actions>
            <div class="flex gap-3 w-full justify-end">
                <label 
                    for="changePasswordModal" 
                    class="btn btn-outline" 
                >
                    {{ $t('actions.cancel') }}
                </label>
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="handleChangePassword"
                    :disabled="loading || authState.user.is_social_provider_login"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
                    <v-icon v-else name="fa-save" class="mr-2" />
                    {{ $t('profile.updatePassword') }}
                </button>
            </div>
        </template>
    </modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { useAuthStore } from '../../store';
import { changePassword } from '../../services/auth.service';
import { swal, mixin } from '../commom/customSwal';
import Modal from '../commom/Modal.vue';
import Input from '../Input.vue';

// Store
const authStore = useAuthStore();
const { authState } = storeToRefs(authStore);

// Estado reactivo
const loading = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Formulario
const form = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

// Reglas
const rules = reactive({
    currentPassword: {
        required: helpers.withMessage('La contraseña actual es requerida', required)
    },
    newPassword: {
        required: helpers.withMessage('La nueva contraseña es requerida', required),
        minLength: helpers.withMessage('La contraseña debe tener al menos 6 caracteres', value => value.length >= 6),
        differentFromCurrent: helpers.withMessage('La nueva contraseña debe ser diferente a la actual', value => value !== form.currentPassword)
    },
    confirmPassword: {
        required: helpers.withMessage('Debes confirmar la nueva contraseña', required),
        sameAsNew: helpers.withMessage('Las contraseñas no coinciden', value => value === form.newPassword)
    }
})

const v$ = useVuelidate(rules, form);

// Métodos
const handleChangePassword = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        return;
    }

    // Verificar si es usuario de redes sociales
    if (authState.value.user.is_social_provider_login) {
        mixin({
            title: 'Los usuarios que inician sesión con redes sociales no pueden cambiar su contraseña aquí.',
            icon: 'warning'
        });
        return;
    }

    loading.value = true;
    
    try {
        const changePasswordData = {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        };

        const response = await changePassword(changePasswordData);
        
        // Mostrar mensaje de éxito
        mixin({
            title: response.message || 'Contraseña actualizada correctamente',
            icon: 'success'
        });
        
        // Cerrar modal y limpiar formulario
        closeModal();
        resetForm();
        
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        
        const errorMessage = error.response?.data?.message || 'Error al actualizar la contraseña';
        
        mixin({
            title: errorMessage,
            icon: 'error',
        });
        
    } finally {
        loading.value = false;
    }
};

const closeModal = () => {
    const modalCheckbox = document.getElementById('changePasswordModal');
    //Toggle checkbox to close modal
    if (modalCheckbox){
        modalCheckbox.checked = false;
    }
};

const resetForm = () => {
    v$.value.$reset();

    Object.assign(form, {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    
    // Reset password visibility
    showCurrentPassword.value = false;
    showNewPassword.value = false;
    showConfirmPassword.value = false;
};



// Limpiar formulario cuando se cierra el modal
const modal = document.getElementById('changePasswordModal');
if (modal) {
    modal.addEventListener('close', resetForm);
}
</script>

<style scoped>
.form-control {
    margin-bottom: 1rem;
}

.input-error {
    border-color: #ef4444;
}

.text-error {
    color: #ef4444;
}

.alert {
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.alert-info {
    background-color: #e0f2fe;
    border: 1px solid #0ea5e9;
    color: #0c4a6e;
}
</style>