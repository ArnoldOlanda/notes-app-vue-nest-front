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

import { API_URL } from "../constants";

const router = useRouter();
const store = useAuthStore();
const { forgotPassword } = store;
const { forgotPasswordLoading:loading } = storeToRefs(store);

const form = reactive({
    email: "",
});

const rules = reactive({
    email: {
        required: helpers.withMessage("The email is required", required),
        email: helpers.withMessage("The email must be a valid email", email),
    },
});

const v$ = useVuelidate(rules, form);

const handleClickForgotPassword = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        await forgotPassword(form.email);
        swal({
            title: "Success",
            text: "Please check your email for a password reset link.",
            icon: "success",
        })
    } catch (error) {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
    }
};

</script>
<template>
    <div class="w-[100%] h-screen flex justify-center items-center">
        <div
            class="container w-[90%] md:w-[550px] border-2 bg-white bg-opacity-80 border-white/30 shadow-lg backdrop-blur-md drop-shadow-xl rounded-lg p-0 md:p-4 flex gap-3 flex-col items-center justify-around text-primary"
        >
            <div class="mt-2">
                <v-icon name="fa-brain" scale="4" />
                <h4 class="text-gray-800 font-semibold mb-4">
                    Forgot Password
                </h4>
                <h4 class="text-gray-600 text-sm">
                    Enter your email address and we will send you a link to reset your password.
                </h4>
            </div>
            <div class="flex flex-col w-full gap-5 px-5">
                <form
                    id="login-form"
                    novalidate
                    @submit.prevent.stop="handleClickForgotPassword"
                >
                    <Input
                        placeholder="email"
                        v-model="form.email"
                        inputType="text"
                        label="Email"
                        :validate="v$.email"
                    />
                </form>
                <div class="">
                    <button
                        class="btn btn-primary text-white w-full"
                        form="login-form"
                    >
                        {{ loading ? "Loading..." : "Recovery Password" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
