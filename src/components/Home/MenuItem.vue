<template>
    <div class="collapse collapse-plus bg-transparent">
        <input type="radio" name="accordion" checked="checked" />
        <div class="collapse-title text-md font-medium text-left">
            {{ props.label }}
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
    }
});


// const colapsed = ref(false);

// const toogle = () => {
//     // colapsed.value = !colapsed.value;
// };
</script>

<style></style>
