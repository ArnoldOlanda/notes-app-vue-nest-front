<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { OhVueIcon as vIcon } from "oh-vue-icons";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";

import { useAuthStore } from "../store";
import Input from "../components/Input.vue";
import { swal } from "../components/commom/customSwal";

const router = useRouter();
const store = useAuthStore();
const { login } = store;
const { loginLoading } = storeToRefs(store);

const form = reactive({
    email: "",
    password: "",
});

const rules = reactive({
    email: {
        required: helpers.withMessage("The email is required", required),
        email: helpers.withMessage("The email must be a valid email", email),
    },
    password: {
        required: helpers.withMessage("The password is required", required),
        length: helpers.withMessage(
            "The password must be at least 6 characters",
            minLength(6)
        ),
    },
});

const v$ = useVuelidate(rules, form);

const handleClickLogin = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        await login(form.email, form.password);
        router.push({ name: "home" });
    } catch (error) {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
    }
};

// const loginGoogle = async () => {
//     window.location.href = `${API_URL}/auth/google`;
// };
</script>
<template>
    <div class="w-[100%] h-screen flex justify-center items-center">
        <div
            class="container w-[90%] md:w-[350px] border-2 bg-white bg-opacity-60 border-white/30 shadow-lg backdrop-blur-md drop-shadow-xl rounded-lg p-0 md:p-4 flex gap-3 flex-col items-center justify-around text-primary"
        >
            <div class="mt-2">
                <v-icon name="fa-brain" scale="4" />
                <h2 class="text-2xl font-bold">Notes App</h2>
                <h3 class="text-xl mt-6 font-bold">Welcome</h3>
                <h4 class="text-gray-800 font-semibold">
                    Login to your account
                </h4>
            </div>
            <div class="flex flex-col w-full gap-5 px-5">
                <form
                    id="login-form"
                    novalidate
                    @submit.prevent.stop="handleClickLogin"
                >
                    <Input
                        placeholder="email"
                        v-model="form.email"
                        inputType="text"
                        label="Email"
                        :validate="v$.email"
                    />
                    <Input
                        placeholder="password"
                        v-model="form.password"
                        inputType="password"
                        label="Password"
                        :validate="v$.password"
                    />
                </form>
                <div class="">
                    <button
                        class="btn btn-primary text-white w-full"
                        form="login-form"
                    >
                        {{ loginLoading ? "Loading..." : "Login" }}
                    </button>
                    <div class="mt-0 text-gray-700">or</div>
                    <button
                        class="btn btn-base w-full"
                        @click="() => loginGoogle()"
                    >
                        <img src="/google.png" alt="" class="w-[26px] h-auto" />

                        Login with Google
                    </button>
                </div>
                <span class="text-gray-700 inline-block mb-4">
                    Don`t have a account?
                    <b>
                        <router-link to="/auth/register" class="text-primary">
                            Register
                        </router-link>
                    </b>
                </span>
            </div>
        </div>
    </div>
</template>
