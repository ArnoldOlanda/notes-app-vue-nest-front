<template>
    <div
        class="w-[100%] h-screen bg-[url('/bg_2.jfif')] bg-cover flex justify-center items-center"
    >
        <div
            class="container w-[25%] min-w-[350px] w-max[600px] border-2 bg-white bg-opacity-80 border-white/30 shadow-lg backdrop-blur-md 500 drop-shadow-xl h-[60%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around text-info"
        >
            <div class="mt-2">
                <!-- <v-icon name="fa-brain" scale="4" /> -->
                <!-- <h2 class="text-2xl font-bold">Vue + Nestjs Auth App</h2> -->
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
                    placeholder="username"
                    inputType="text"
                    label="Username"
                    v-model="formData.username"
                    :validate="v$.username"
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
                    Register
                </button>
            </div>
            <span class="text-gray-800">
                Already have a account?
                <b
                    ><router-link to="/auth/login" class="text-info"
                        >Login</router-link
                    ></b
                >
            </span>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { helpers, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { useAuthStore } from "../store/auth/useAuthStore";
import Input from "../components/Input.vue";
import { useRouter } from "vue-router";
import { swal } from "../components/commom/customSwal";

const store = useAuthStore();
const router = useRouter();
const { register } = store;
const formData = reactive({
    name: "",
    username: "",
    password: "",
});

const rules = reactive({
    name: {
        required: helpers.withMessage("The name is required", required),
    },
    username: {
        required: helpers.withMessage("The username is required", required),
    },
    password: {
        required: helpers.withMessage("The password is required", required),
        length: helpers.withMessage("The password must be at least 6 characters", minLength(6)),
    },
})

const v$= useVuelidate(rules, formData);

const handleClickRegiser = async() => {
    console.log(formData);
    const isValid = await v$.value.$validate();
    if (!isValid){
        swal({
            title: "Error",
            text: "Please fill all required fields",
            icon: "error",
        });
        return;
    }
    register({ ...formData });
    swal({
        title: "Success",
        text: "User registered successfully, please login",
        icon: "success",
    });
    router.push({ name: "login" });  
};
</script>
