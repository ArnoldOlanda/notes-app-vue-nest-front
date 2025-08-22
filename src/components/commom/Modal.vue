<template>
    <dialog :id="id" class="modal">
        <div class="modal-box text-base-content">
            <slot name="title"></slot>
            <slot name="content"></slot>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <slot name="actions"></slot>
                </form>
            </div>
        </div>
        <form
            v-if="closeOnClickOutside"
            method="dialog" 
            class="modal-backdrop"
        >
            <button>close</button>
        </form>
    </dialog>
</template>

<script setup>

defineProps({
    id:{type: String, required: true},
    closeOnClickOutside:{type: Boolean, default: false}
});

</script>

<style lang="scss" scoped>

</style>