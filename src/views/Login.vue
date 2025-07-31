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
      minLength(6),
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
    });
  }
};

const loginGoogle = async () => {
  window.location.href = `${API_URL}/auth/google`;
};

const loginGithub = async () => {
  window.location.href = `${API_URL}/auth/github`;
};
</script>
<template>
  <div class="flex min-h-screen w-[100%] items-center justify-center">
    <div
      class="container flex w-[90%] flex-col items-center justify-around gap-3 rounded-lg border-2 border-white/30 bg-white bg-opacity-80 p-0 text-primary shadow-lg drop-shadow-xl backdrop-blur-md md:w-[350px] md:p-4"
    >
      <div class="mt-2">
        <v-icon name="fa-brain" scale="3" />
        <h2 class="text-2xl font-bold">Notes App</h2>
        <!-- <h3 class="text-xl mt-6 font-bold">Welcome</h3> -->
        <h4 class="font-semibold text-gray-800">Login to your account</h4>
      </div>
      <div class="flex w-full flex-col gap-5 px-5">
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
          <div class="text-right text-sm">
            <router-link :to="{ name: 'forgot-password' }"
              >Recovery password</router-link
            >
          </div>
        </form>
        <div class="">
          <button class="btn btn-primary w-full text-white" form="login-form">
            {{ loginLoading ? "Loading..." : "Login" }}
          </button>
          <div class="mt-0 text-gray-700">or</div>
          <button
            class="btn-base btn mb-2 w-full border-[1px] border-blue-400 bg-white"
            @click="() => loginGoogle()"
          >
            <img src="/google.png" alt="" class="h-auto w-[26px]" />

            Sign in with Google
          </button>
          <button
            class="btn-base github-signin-btn btn"
            @click="() => loginGithub()"
          >
            <img
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
              alt="GitHub Icon"
              class="github-icon"
            />
            Sign in with GitHub
          </button>
        </div>
        <span class="mb-4 inline-block text-gray-700">
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
<style scoped>
.github-signin-container {
  background-color: #000;
  transition: background-color 0.3s ease;
  border-radius: 6px;
  border: none;
}

.github-signin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
  width: 100%;
}

.github-signin-btn:hover {
  background-color: #333;
}

.github-signin-btn .github-icon {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}

.github-signin-btn span {
  font-family: Arial, sans-serif;
  font-size: 16px;
}
</style>
