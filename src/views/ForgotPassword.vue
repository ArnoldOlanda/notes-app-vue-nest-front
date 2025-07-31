<script setup>
import { reactive } from "vue";
import { OhVueIcon as vIcon } from "oh-vue-icons";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { useMutation } from "@vue/apollo-composable";
import gpl from "graphql-tag";
import Input from "../components/Input.vue";
import { swal } from "../components/commom/customSwal";
import { ApolloError } from "@apollo/client/errors";
import { useAuthStore } from "../store/auth/useAuthStore";

const store = useAuthStore();

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

const { mutate, loading } = useMutation(gpl`
  mutation forgotPassword($email: String!) {
      forgotPassword(email: $email){
          message
      }
  }
`);

const handleClickForgotPassword = async () => {
  try {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const result = await mutate({ email: form.email });

    if (result?.data?.forgotPassword) {
      const { message } = result.data.forgotPassword;
      store.setErrorMessage(message);
    }

    swal({
      title: "Success",
      text: "Please check your email for a password reset link.",
      icon: "success",
    });
  } catch (error) {
    let message = "";
    if (error instanceof ApolloError && error.networkError) {
      message =
        "Cannot connect to the server. Please check your internet connection.";
    } else {
      message = error.message;
    }
    swal({
      title: "Error",
      text: message,
      icon: "error",
    });
  }
};
</script>
<template>
  <div class="flex h-screen w-[100%] items-center justify-center">
    <div
      class="container flex w-[90%] flex-col items-center justify-around gap-3 rounded-lg border-2 border-white/30 bg-white bg-opacity-80 p-0 text-primary shadow-lg drop-shadow-xl backdrop-blur-md md:w-[550px] md:p-4"
    >
      <div class="mt-2">
        <v-icon name="fa-brain" scale="4" />
        <h4 class="mb-4 font-semibold text-gray-800">Forgot Password</h4>
        <h4 class="text-sm text-gray-600">
          Enter your email address and we will send you a link to reset your
          password.
        </h4>
      </div>
      <div class="flex w-full flex-col gap-5 px-5">
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
            class="btn btn-primary w-full text-white" 
            
            form="login-form" 
            :disabled="loading"
          >
            {{ loading ? "Loading..." : "Recovery Password" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
