<template>
    <div class="collapse bg-transparent">
        <input type="checkbox" :checked="props.open"/>
        <div class="collapse-title text-md font-medium flex justify-between">
            {{ props.label }}
            <v-icon name="fa-plus" />
        </div>
        <div class="collapse-content px-0">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    open:{
        type: Boolean,
        default: false,
    }
});


// const colapsed = ref(false);

// const toogle = () => {
//     // colapsed.value = !colapsed.value;
// };
</script>

<style></style>
