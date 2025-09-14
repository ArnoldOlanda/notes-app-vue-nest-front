<script setup>
import { reactive, ref } from "vue";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { useAuthStore } from "../store/auth/useAuthStore";
import { useConfigStore } from "../store/config/useConfigStore";
import Input from "../components/Input.vue";
import { useRouter } from "vue-router";
import { mixin, swal } from "../components/commom/customSwal";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const configStore = useConfigStore();
const router = useRouter();
const { register } = store;
const { authState } = storeToRefs(store);
const { config } = storeToRefs(configStore);
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
    length: helpers.withMessage(
      "The password must be at least 6 characters",
      minLength(6),
    ),
  },
});

const v$ = useVuelidate(rules, formData);

const handleClickRegiser = async () => {
  try {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    await register({ ...formData });
    mixin({
      title: "Account created successfully!",
      icon: "success",
    });
    authState.value.auth === "authenticated" && router.push({ name: "home" });
  } catch (error) {
    swal({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
};
</script>
<template>
  <div class="flex h-screen w-[100%] items-center justify-center" :data-theme="config.theme">
    <div
      class="container flex w-[90%] flex-col items-center justify-around gap-3 rounded-lg border-2 border-base-300 bg-base-100 bg-opacity-60 p-0 text-base-content shadow-lg drop-shadow-xl md:w-[450px] md:p-4"
    >
      <div class="mt-2">
        <v-icon name="fa-brain" class="text-blue-500" scale="3" />
        <h2 class="text-2xl font-bold text-blue-500">Notes App</h2>
        <h4 class="text-base-content/70">Create an account</h4>
      </div>
      <div class="flex w-full flex-col gap-1 px-4">
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
        <button class="btn btn-primary text-white mt-2" @click="handleClickRegiser">
          {{ authState.isLoading ? "Loading..." : "Register" }}
        </button>
      </div>
      <span class="mb-4 inline-block text-base-content/80">
        Already have a account?
        <b>
          <router-link to="/auth/login" class="text-blue-500 hover:text-blue-500/80">
            Login
          </router-link>
        </b>
      </span>
    </div>
  </div>
</template>
