<template>
    <div class="relative">
        <div class="text-left">{{ label }}</div>
        <input
            id=""
            class="p-2 h-[50px] outline-none rounded-lg w-full bg-white border-2 border-blue-900"
            :type="!showPassword ? inputType : 'text'"
            :placeholder="placeholder"
            v-model="inputValue"
            @input="$emit('emit-value', inputValue)"
        />
        <div
            v-if="inputType === 'password'"
            @click="toggleShowPassword"
            class="absolute right-2 top-9"
        >
            <v-icon v-if="!showPassword" name="fa-eye" scale="1.5" />
            <v-icon v-else name="fa-eye-slash" scale="1.5" />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { OhVueIcon } from "oh-vue-icons";
export default {
    props: {
        inputType: String,
        placeholder: String,
        label: String,
    },
    components: {
        "v-icon": OhVueIcon,
    },
    setup() {
        const inputValue = ref("");
        const showPassword = ref(false);

        return {
            inputValue,
            showPassword,
            toggleShowPassword: () => {
                showPassword.value = !showPassword.value;
            },
        };
    },
};
</script>
