<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { OhVueIcon as vIcon } from "oh-vue-icons";
import { useVuelidate } from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { useMutation } from "@vue/apollo-composable";

import { useAuthStore } from "../store";
import Input from "../components/Input.vue";
import { swal } from "../components/commom/customSwal";

import { API_URL } from "../constants";
import { RESET_PASSWORD_MUTATION } from "../graphql/mutations/resetPassword.mutation";

const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const { mutate: resetPasswordMutation, loading } 
    = useMutation(RESET_PASSWORD_MUTATION);

const form = reactive({
    password: "",
    confirmPassword: "",
});

const rules = reactive({
    password: {
        required: helpers.withMessage("The password is required", required),
        length: helpers.withMessage(
            "The password must be at least 6 characters",
            minLength(6)
        ),
    },
    confirmPassword: {
        required: helpers.withMessage("The confirm password is required", required),
        sameAsPassword: helpers.withMessage(
            "The confirm password must match the password",
            (value, parent) => value === parent.password
        ),
    },
});

const v$ = useVuelidate(rules, form);

const handleClickResetPassword = async () => {
    try {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        await resetPasswordMutation({
            token: route.query.token || "",
            password: form.password,
        });
        swal({
            title: "Success",
            text: "Password reset successfully, you can now login with your new password.",
            icon: "success",
        })
        router.push({ name: "login" });
    } catch (error) {
        swal({
            title: "Error",
            text: error.message,
            icon: "error",
        })
    }
};

onMounted(()=>{
    console.log(route.query);
})

</script>
<template>
    <div class="w-[100%] h-screen flex justify-center items-center">
        <div
            class="container w-[90%] md:w-[550px] border-2 bg-base-100 bg-opacity-80 border-base-300 shadow-lg backdrop-blur-md drop-shadow-xl rounded-lg p-0 md:p-4 flex gap-3 flex-col items-center justify-around text-base-content"
        >
            <div class="mt-2">
                <v-icon name="fa-brain" scale="4" class="text-blue-500" />
                <h4 class="text-blue-500 font-semibold mb-4">
                    Reset Password
                </h4>
                <h4 class="text-base-content/70 text-sm">
                    Enter your new password below.
                </h4>
            </div>
            <div class="flex flex-col w-full gap-5 px-5">
                <form
                    id="login-form"
                    novalidate
                    @submit.prevent.stop="handleClickResetPassword"
                >
                    <Input
                        placeholder="password"
                        v-model="form.password"
                        inputType="password"
                        label="Password"
                        :validate="v$.password"
                    />
                    <Input
                        placeholder="confirmPassword"
                        v-model="form.confirmPassword"
                        inputType="password"
                        label="Confirm Password"
                        :validate="v$.confirmPassword"
                    />
                </form>
                <div class="">
                    <button
                        class="btn btn-primary text-white w-full"
                        form="login-form"
                    >
                        {{ loading ? "Loading..." : "Reset Password" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
