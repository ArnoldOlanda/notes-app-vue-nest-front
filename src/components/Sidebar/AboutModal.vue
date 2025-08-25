<template>
    <modal id="aboutModal">
        <template #title>
            <h3 class="text-lg font-bold">
                About
            </h3>
        </template>
        
        <template #content>
            <div class="grid grid-cols-1 gap-4 pt-4">
                <div class="flex flex-col gap-3">
                    <div class="flex gap-1">
                        <label class="text-left font-semibold">Versión:</label>
                        <span>{{ version }}</span>
                    </div>
                    
                    <div class="flex flex-col gap-1">
                        <label class="text-left font-semibold">Descripción:</label>
                        <p class="text-gray-600 text-left">
                            Aplicación de notas desarrollada con Vue.js y NestJS. Permite crear, organizar y gestionar notas
                            personales con características como categorías, etiquetas y búsqueda avanzada.
                        </p>
                    </div>

                    <div class="flex gap-1">
                        <label class="text-left font-semibold">Desarrollado por:</label>
                        <a href="https://github.com/arnoldolanda" target="_blank" class="text-blue-500 underline">Arnold Olanda</a>
                    </div>

                    <div class="flex gap-1">
                        <label class="text-left font-semibold">Fecha de actualización:</label>
                        <span>24 de agosto de 2025</span>
                    </div>
                </div>
            </div>
        </template>
    </modal>
</template>

<script setup>
import Modal from '../commom/Modal.vue';
import pkg from '../../../package.json';

const version = pkg.version;
</script>

<style lang="scss" scoped>

</style>