<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { OhVueIcon as vIcon } from 'oh-vue-icons';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength } from '@vuelidate/validators';

import Input from '../components/Input.vue';
import { useAuthStore } from '../store/auth/useAuthStore';
import { swal } from '../components/commom/customSwal';
import { googleService } from '../services/google.service';
import { API_URL } from '../constants';
import { storeToRefs } from 'pinia';

const router = useRouter();
const isLoading = ref(false);
const form = reactive({
  email: '',
  password: '',
});

const rules = reactive({
  email: {
    required: helpers.withMessage('The email is required', required),
    email: helpers.withMessage('The email must be a valid email', email),
  },
  password: {
    required: helpers.withMessage('The password is required', required),
    length: helpers.withMessage(
      'The password must be at least 6 characters',
      minLength(6)
    ),
  },
});

const v$ = useVuelidate(rules, form);
const store = useAuthStore();
const { login } = store;
const { authState } = storeToRefs(store);

const handleClickLogin = async () => {
  const isValid = await v$.value.$validate();
  
  if (!isValid) {
    swal({
      title: 'Error',
      text: 'Please fill all required fields',
      icon: 'error',
    });
    return;
  }

  await login(form.email, form.password);
  router.push({ name: 'home' });
};

const loginGoogle = async () => {
  window.location.href = `${API_URL}/auth/google`;
};

</script>
<template>
  <div
    class="w-[100%] h-screen bg-[url('/bg_2.jfif')] bg-cover flex justify-center items-center"
  >
    <div
      class="container w-[25%] min-w-[350px] w-max[600px] border-2 bg-white bg-opacity-80 border-white/30 shadow-lg backdrop-blur-md drop-shadow-xl h-[70%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around text-primary"
    >
      <div class="mt-2">
        <v-icon name="fa-brain" scale="4" />
        <h2 class="text-2xl font-bold">Notes App</h2>
        <h3 class="text-xl mt-12 font-bold">Welcome</h3>
        <h4 class="text-gray-800 font-semibold">Login to your account</h4>
      </div>
      <div class="flex flex-col w-full gap-5 pl-10 pr-10">
        <form   
          id="login-form"
          novalidate 
          @submit.prevent.stop="handleClickLogin">
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
        <button class="btn btn-primary text-white w-full" form="login-form">
          {{ authState.isLoading ? 'Loading...' : 'Login' }}
        </button>
          <div class="mt-0 text-gray-700"> or </div>
          <button
            class="btn btn-base w-full"
            @click="() => loginGoogle()"
          >
            <img src="/google.png" alt="" class="w-[26px] h-auto"> 

            Login with Google
          </button>
        </div>
        <span class="text-gray-700">
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
