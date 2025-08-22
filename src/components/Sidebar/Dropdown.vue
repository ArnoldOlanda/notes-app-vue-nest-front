<template>
    <div 
        class="dropdown"
        :class="{
            'dropdown-bottom': bottom,
            'dropdown-right': right,
            'dropdown-top': top,
            'dropdown-left': left,
            'dropdown-center': center,
            'dropdown-end': end,
        }"
    >
        <div 
            tabindex="0" 
            role="button"
            @click.stop.prevent
            :class="iconWrapperClassName"
        >
            <v-icon :name="icon" class="text-white"/>
        </div>
        <ul 
            tabindex="0"
            class="dropdown-content z-10 menu bg-base-100 rounded-md p-1 shadow-sm"
            :class="className"
        >
            <slot />
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: { type: String, required: true },
    className: { type: String, default: "" },
    iconWrapperClassName: { type: String, default: "" },
    bottom: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    end: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>

</style>