<template>
    <div class="collapse bg-transparent overflow-visible">
        <input type="checkbox" :checked="props.open" />
        <div
            class="collapse-title text-md font-medium flex justify-between"
        >
            {{ props.label }}
            <v-icon name="fa-plus" @click="openModal" class="z-10"/>
        </div>
        <div class="collapse-content px-0">
            <slot name="content" />
        </div>
        <slot name="modal" />
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        default: false,
    },
    openModal: {
        type: Function,
        required: true,
    },
});

// const colapsed = ref(false);

// const toogle = () => {
//     // colapsed.value = !colapsed.value;
// };
</script>

<style></style>
