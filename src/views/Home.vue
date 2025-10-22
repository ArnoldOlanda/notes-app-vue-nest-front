<template>
    <div class="flex w-full h-screen bg-pattern" :data-theme="config.theme">
        <div class="w-full relative h-full flex flex-col sm:flex-row shadow-2xl overflow-x-hidden">
            <!-- Hamburger Menu - Solo visible en móviles -->
            <HamburgerMenu 
                :is-open="isSidebarOpen" 
                @toggle="toggleSidebar"
            />
            
            <!-- Sidebar - Desktop siempre visible, Mobile con overlay -->
            <transition name="slide">
                <Sidebar 
                    v-show="isSidebarOpen || !isMobile"
                    :class="[
                        'sm:flex',
                        isMobile ? 'fixed inset-y-0 left-0 z-40' : ''
                    ]"
                />
            </transition>
            
            <!-- Overlay oscuro cuando el sidebar está abierto en móvil -->
            <transition name="fade">
                <div 
                    v-if="isSidebarOpen && isMobile"
                    @click="toggleSidebar"
                    class="fixed inset-0 bg-black bg-opacity-50 z-30"
                />
            </transition>
            
            <!-- NoteList - En móvil se muestra arriba, en desktop a la izquierda -->
            <NoteList 
                :class="[
                    'w-full sm:w-auto sm:flex',
                    isMobile ? 'pt-12 h-auto max-h-[40vh]' : 'h-full'
                ]"
            />
            
            <!-- NoteDetail - Ocupa el espacio restante -->
            <NoteDetail 
                :class="[
                    'flex-1',
                    isMobile ? 'min-h-[60vh]' : 'h-full'
                ]"
            />
            
            <ToggleTheme />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

import Sidebar from "../components/Home/Sidebar.vue";
import NoteList from "../components/Home/NotesList.vue";
import NoteDetail from "../components/Home/NoteDetail.vue";
import ToggleTheme from "../components/Sidebar/ToggleTheme.vue";
import HamburgerMenu from "../components/Home/HamburgerMenu.vue";
import { useConfigStore } from "../store/config/useConfigStore";

const store = useConfigStore();
const { locale } = useI18n();
const { config } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

// Estado para el sidebar móvil
const isSidebarOpen = ref(false);
const windowWidth = ref(window.innerWidth);

// Computed para determinar si es móvil
const isMobile = computed(() => windowWidth.value < 640); // 640px es el breakpoint 'sm' de Tailwind

// Toggle del sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

// Listener para el resize de la ventana
const handleResize = () => {
    windowWidth.value = window.innerWidth;
    // Cerrar sidebar en móvil cuando se redimensiona a desktop
    if (!isMobile.value) {
        isSidebarOpen.value = false;
    }
};

onMounted(() => {
    const query = route.query;
    if (query) {
        router.replace({ name: route.name, query: null });
    }

    //Set locale
    if (config.value && config.value.language) {
        locale.value = config.value.language;
    }

    // Agregar listener para resize
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    // Limpiar listener
    window.removeEventListener('resize', handleResize);
});
</script>

<style>
.bg-pattern {
    --s: 80px; /* the size */
    --c: #dadcdd;

    --_s: calc(2 * var(--s)) calc(2 * var(--s));
    --_g: 35.36% 35.36% at;
    --_c: #0000 66%, #c9c9c9 68% 70%, #afafaf00 72%;
    background: radial-gradient(var(--_g) 100% 25%, var(--_c))
            var(--s) var(--s) / var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) var(--s)
            var(--s) / var(--_s),
        radial-gradient(var(--_g) 100% 25%, var(--_c)) 0 0 /
            var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) 0 0 / var(--_s),
        repeating-conic-gradient(var(--c) 0 25%, #0000 0 50%) 0 0 /
            var(--_s),
        radial-gradient(var(--_c)) 0 calc(var(--s) / 2) / var(--s)
            var(--s) var(--c);
}

/* Transiciones para el sidebar */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

/* Transición para el overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
