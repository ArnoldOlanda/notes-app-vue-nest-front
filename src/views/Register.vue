<script setup>
import { reactive, ref } from "vue";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { useAuthStore } from "../store/auth/useAuthStore";
import Input from "../components/Input.vue";
import { useRouter } from "vue-router";
import { mixin, swal } from "../components/commom/customSwal";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const router = useRouter();
const { register } = store;
const { authState } = storeToRefs(store);
const formData = reactive({
    name: "",
    email: "",
    password: "",
});

const rules = reactive({
    name: {
        required: helpers.withMessage("The name is required", required),
    },
    email: {
        required: helpers.withMessage("The username is required", required),
        email: helpers.withMessage("The username must be a valid email", email),
    },
    password: {
        required: helpers.withMessage("The password is required", required),
        length: helpers.withMessage("The password must be at least 6 characters", minLength(6)),
    },
})

const v$= useVuelidate(rules, formData);

const handleClickRegiser = async() => {
    const isValid = await v$.value.$validate();
    if (!isValid){
        swal({
            title: "Error",
            text: "Please fill all required fields",
            icon: "error",
        });
        return;
    }
    await register({ ...formData });
    await mixin({
        title: "Account created successfully",
        icon: "success",
    })
    authState.value.auth === 'authenticated' && router.push({ name: "home" });  
};
</script>
<template>
    <div
        class="w-[100%] h-screen bg-[url('/bg_2.jfif')] bg-cover flex justify-center items-center"
    >
        <div
            class="container w-[25%] min-w-[350px] w-max[600px] border-2 bg-white bg-opacity-80 border-white/30 shadow-lg backdrop-blur-md 500 drop-shadow-xl h-[60%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around text-info"
        >
            <div class="mt-2">
                <h3 class="text-xl mt-6 text-info">Welcome</h3>
                <h4 class="text-gray-600">Create an account</h4>
            </div>
            <div class="flex flex-col w-full gap-5 pl-8 pr-8">
                <Input
                    placeholder="name"
                    inputType="text"
                    label="Name"
                    v-model="formData.name"
                    :validate="v$.name"
                />
                <Input
                    placeholder="email"
                    inputType="text"
                    label="Email"
                    v-model="formData.email"
                    :validate="v$.email"
                />
                <Input
                    placeholder="password"
                    inputType="password"
                    label="Password"
                    v-model="formData.password"
                    :validate="v$.password"
                />
                <button
                    class="btn btn-info text-white"
                    @click="handleClickRegiser"
                >
                    {{ authState.isLoading ? "Loading..." : "Register" }}
                </button>
            </div>
            <span class="text-gray-800">
                Already have a account?
                <b>
                    <router-link to="/auth/login" class="text-info">
                        Login
                    </router-link>
                </b>
            </span>
        </div>
    </div>
</template>
