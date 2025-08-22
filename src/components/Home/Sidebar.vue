<template>
    <div class="container bg-primary w-72 text-white flex flex-col">
        <div class="flex-1">
            <sidebar-header />
            <div class="w-full">                
                <category-menu />
                <tag-menu />
                <menu-item :label="$t('sidebar.menus.trash')"></menu-item>
            </div>
        </div>
        <sidebar-footer />
    </div>
</template>

<script setup>
import CategoryMenu from "../Sidebar/CategoryMenu.vue";
import MenuItem from "./MenuItem.vue";
import TagMenu from "../Sidebar/TagMenu.vue";
import SidebarHeader from "../Sidebar/SidebarHeader.vue";
import SidebarFooter from "../Sidebar/SidebarFooter.vue";

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
