<template>
    <input type="checkbox" :id="id" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box text-base-content" :class="className">
            <slot name="title"></slot>
            <slot name="content"></slot>

            <div class="modal-action">
                <label 
                    :for="id" 
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕ </label>
                <slot name="actions"></slot>
            </div>
        </div>
        <label
            v-if="closeOnClickOutside"
            :for="id"
            class="modal-backdrop"
        >
            Close
        </label>
    </div>
</template>

<script setup>

defineProps({
    id:{type: String, required: true},
    closeOnClickOutside:{type: Boolean, default: false},
    className:{type: String, default: ''},
});

</script>

<style scoped></style>