<template>
    <li>
        <a 
            href="#" 
            @click="$emit('click')" 
            class="text-base-content"
            :class="[className]"
        >
            <v-icon 
                :name="icon" 
                animation="wrench" 
                hover 
            />
            <slot />
        </a>
    </li>
</template>

<script setup>

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    className:{
        type: String,
        default: 'hover:text-blue-500',
    },
});

</script>

<style lang="scss" scoped>

</style>