<template>
    <div class="w-full h-screen bg-gradient-to-br from-blue-600 to-black">
        <router-view v-slot="{Component}">
            <transition name="fade" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>