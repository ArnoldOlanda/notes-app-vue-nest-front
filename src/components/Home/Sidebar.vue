<template>
    <div class="container bg-primary w-72 text-white flex flex-col">
        <div class="flex-1">
            <sidebar-header/>
            <div class="w-full">                
                <category-menu />
                <tag-menu />
                <div class="flex justify-between px-10 py-2 cursor-pointer" @click="handleGetTrashedNotes">
                    <span class="font-semibold">{{ $t('sidebar.menus.trash') }}</span>
                    <v-icon name="fa-trash" class="mr-2" />
                </div>
            </div>
        </div>
        <sidebar-footer />
        
        <!-- Modal de perfil -->
        <profile-modal />
        
        <!-- Modal de cambio de contraseña -->
        <change-password-modal />

        <!-- Modal de configuración -->
        <settings-modal />

        <!-- Modal de acerca de -->
        <about-modal />

        <!-- Modal de política de privacidad -->
        <privacy-policy-modal />
    </div>
</template>

<script setup>
import CategoryMenu from "../Sidebar/CategoryMenu.vue";
import { useNotesStore } from "../../store";
import TagMenu from "../Sidebar/TagMenu.vue";
import SidebarHeader from "../Sidebar/SidebarHeader.vue";
import SidebarFooter from "../Sidebar/SidebarFooter.vue";
import ProfileModal from "../Sidebar/ProfileModal.vue";
import ChangePasswordModal from "../Sidebar/ChangePasswordModal.vue";
import SettingsModal from "../Sidebar/SettingsModal.vue";
import AboutModal from "../Sidebar/AboutModal.vue";
import PrivacyPolicyModal from "../Sidebar/PrivacyPolicyModal.vue";

const notesStore = useNotesStore();

const handleGetTrashedNotes = async () => {
    notesStore.setShowingTrashedNotes(true);
    await notesStore.getTrashedNotes();
}

</script>

<style></style>

<!-- TODO Implementar a futuro
🔧 Configuración o Ajustes
Cambiar tema (oscuro/claro)

Preferencias del usuario

Opciones de sincronización

👤 Cuenta de usuario
Ver/editar perfil

Cerrar sesión

Cambiar contraseña

📦 Información de la app
Acerca de

Versión de la app

Términos y condiciones / Política de privacidad

❓ Ayuda y soporte
Centro de ayuda

Contacto / Soporte técnico

Atajos de teclado

🔄 Sincronización / Backup
Sincronizar ahora

Estado de conexión
-->
