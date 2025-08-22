<template>
    <li>
        <a href="#" @click="$emit('click')" class="text-base-content hover:text-blue-500">
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
});

</script>

<style lang="scss" scoped>

</style>