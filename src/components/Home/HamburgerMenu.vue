<template>
    <div class="fixed top-4 left-7 z-50 sm:hidden">
        <button 
            @click="toggleSidebar"
            class="btn btn-circle shadow-lg"
            :aria-label="$t('hamburger.toggle')"
        >
            <v-icon :name="isOpen ? 'fa-times' : 'fa-bars'" scale="1.1" />
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['toggle']);

const toggleSidebar = () => {
    emit('toggle');
};
</script>

