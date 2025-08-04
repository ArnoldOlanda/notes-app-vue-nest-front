<template>
    <li>
        <a href="#" @click="$emit('click')" class="text-neutral-600">
            <v-icon 
                :name="icon" 
                :color="iconColor" 
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
    iconColor: {
        type: String,
        default: "#525252",
    },
});

</script>

<style lang="scss" scoped>

</style>