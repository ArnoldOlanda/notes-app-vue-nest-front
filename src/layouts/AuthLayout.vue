<template>
    <div class="w-full h-screen" :data-theme="config.theme">
        <ToggleTheme />
        <router-view v-slot="{Component}">
            <transition name="fade" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useConfigStore } from "../store/config/useConfigStore";
import ToggleTheme from "../components/Sidebar/ToggleTheme.vue";

const store = useConfigStore();
const { config } = storeToRefs(store);
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>