<template>
    <div class="container bg-primary w-72 text-white flex flex-col">
        <div class="flex-1">
            <div class="flex justify-between items-center p-10">
                <div class="flex gap-2 items-center">
                    <img
                        :src="authState.user.avatar"
                        alt="profile_photo"
                        class="w-8 h-8 rounded-full"
                    />
                    <span>{{ authState.user.name }}</span>
                </div>
                <!-- <v-icon name="fa-ellipsis-v" /> -->
                <dropdown icon="fa-ellipsis-v" class-name="w-48">
                    <dropwdown-item icon="fa-user" @click="$emit('profile-click')">
                        Profile
                    </dropwdown-item>

                    <dropwdown-item icon="fa-user" @click="$emit('settings-click')">
                        Theme
                    </dropwdown-item>

                    <dropwdown-item icon="fa-user" @click="$emit('settings-click')">
                        Settings
                    </dropwdown-item>

                    <dropwdown-item icon="fa-sign-out-alt" @click="logout">
                        Change Password
                    </dropwdown-item>

                    <dropwdown-item icon="fa-sign-out-alt" @click="logout">
                        Logout
                    </dropwdown-item>
                </dropdown>
            </div>
            <div class="w-full">
                
                <category-menu />

                <tag-menu />

                <menu-item label="TRASH" icon-name="fa-regular-trash-alt" />
            </div>
        </div>
        <div class="mb-4 w-full flex items-start ml-10">
            
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store";
import { confirm } from "../commom/customSwal";
import CategoryMenu from "../Sidebar/CategoryMenu.vue";
import MenuItem from "./MenuItem.vue";
import TagMenu from "../Sidebar/TagMenu.vue";
import Dropdown from "../Sidebar/Dropdown.vue";
import DropwdownItem from "../Sidebar/DropwdownItem.vue";

const store = useAuthStore();
const router = useRouter();

const { authState } = storeToRefs(store);

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
