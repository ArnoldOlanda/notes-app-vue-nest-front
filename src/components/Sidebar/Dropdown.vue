<template>
    <div class="dropdown dropdown-bottom">
        <div 
            tabindex="0" 
            role="button"
            @click.stop.prevent
        >
            <v-icon :name="icon" class="text-white"/>
        </div>
        <ul 
            tabindex="0"
            class="dropdown-content z-10 menu bg-base-100 text-neutral-800 rounded-md p-1 shadow-sm"
            :class="className"
        >
            <slot />
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        default: "",
    }
})
</script>

<style lang="scss" scoped>

</style>