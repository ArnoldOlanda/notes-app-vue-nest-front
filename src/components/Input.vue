<template>
    <div class="relative">
        <div 
            class="text-left"
            :class="validate ? (validate.$error ? 'text-red-500' : 'text-info') : 'text-gray-600'"
        >
            {{ label }}
        </div>
        <input
            class="p-2 px-4 h-[50px] input input-bordered input-info w-full text-gray-800"
            :class="validate ? (validate.$error ? 'border-red-500' : 'border-info') : ''"
            :type="!showPassword ? inputType : 'text'"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div
            v-if="inputType === 'password'"
            @click="toggleShowPassword"
            class="absolute right-2 top-9"
        >
            <v-icon v-if="!showPassword" name="fa-eye" scale="1.5" class="text-info"/>
            <v-icon v-else name="fa-eye-slash" scale="1.5" class="text-info"/>
        </div>
        <div v-if="validate" class="text-left">
            <div v-for="error in validate.$errors">
                <span :key="error.$uid" class="text-red-500">
                    {{ error.$message }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { OhVueIcon as vIcon } from "oh-vue-icons";

const props = defineProps({
    inputType: String,
    modelValue: String,
    placeholder: String,
    label: String,
    validate: {
        type: Object,
        default: null,
    }
});

const showPassword = ref(false);

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
}

</script>
