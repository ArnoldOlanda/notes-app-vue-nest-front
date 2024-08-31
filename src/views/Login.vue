<template>
    <div class="w-[100%] h-screen bg-[url('/bg_2.jfif')] bg-cover flex justify-center items-center">
        <div
            class="container w-[25%] min-w-[350px] w-max[600px] border-2 bg-white bg-opacity-80 border-white/30 shadow-lg backdrop-blur-md drop-shadow-xl h-[60%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around text-info"
        >
            <div class="mt-2">
                <v-icon name="fa-brain" scale="4" />
                <h2 class="text-2xl font-bold">Notes App</h2>
                <h3 class="text-xl mt-12 font-bold">Welcome</h3>
                <h4 class="text-gray-800 font-semibold">Login to your account</h4>
            </div>
            <div class="flex flex-col w-full gap-5 pl-10 pr-10">
                <Input
                    placeholder="user"
                    v-model="form.user"
                    inputType="text"
                    label="Username"
                    :validate="v$.user"
                />
                <Input
                    placeholder="password"
                    v-model="form.password"
                    inputType="password"
                    label="Password"
                    :validate="v$.password"
                />
                <button
                    class="btn btn-info text-white"
                    @click="handleClickLogin"
                >
                    Login
                </button>
                <span class="text-gray-700">
                    Don`t have a account?
                    <b>
                        <router-link to="/auth/register" class="text-info">
                            Register
                        </router-link>
                    </b>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { OhVueIcon as vIcon } from "oh-vue-icons";
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'

import Input from "../components/Input.vue";
import { useAuthStore } from "../store/auth/useAuthStore";
import { swal } from "../components/commom/customSwal";

const router = useRouter();
const form = reactive({
    user: "",
    password: "",
});

const rules = reactive({
    user: {
        required: helpers.withMessage("The user is required", required)
    },
    password: {
        required: helpers.withMessage("The password is required", required),
        length: helpers.withMessage("The password must be at least 6 characters", minLength(6))
    }
})

const v$ = useVuelidate(rules, form)
const store = useAuthStore();
const { login } = store;

const handleClickLogin = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid){
        swal({
            title: "Error",
            text: "Please fill all required fields",
            icon: "error",
        })
        return;
    }; 
    try {
        await login(form.user, form.password);
        if (store.auth !== "not-authenticated")
            router.push({ name: "home" });
        else alert(store.errorMessage);
    } catch (error) {
        console.log(error);
    }
};
</script>
