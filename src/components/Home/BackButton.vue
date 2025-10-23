<template>
    <div class="fixed bottom-14 left-4 z-50 sm:hidden">
        <button 
            @click="goBack"
            class="btn btn-circle shadow-lg"
            :aria-label="$t('navigation.back')"
        >
            <v-icon name="fa-arrow-left" scale="1.2" />
        </button>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['back']);

const goBack = () => {
    emit('back');
};
</script>
