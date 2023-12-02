<template>
    <div
        class="w-[100%] h-screen bg-[url('/bg.jpg')] bg-cover flex justify-center items-center"
    >
        <div
            class="container w-[28%] min-w-[350px] w-max[600px] border-2 bg-white text-blue-800 drop-shadow-xl h-[80%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around"
        >
            <div class="mt-2">
                <!-- <v-icon name="fa-brain" scale="4" /> -->
                <!-- <h2 class="text-2xl font-bold">Vue + Nestjs Auth App</h2> -->
                <h3 class="text-xl mt-6">Welcome</h3>
                <h4 class="text-gray-600">Create an account</h4>
            </div>
            <div class="flex flex-col w-full gap-5 pl-8 pr-8">
                <Input
                    placeholder="name"
                    inputType="text"
                    label="Name"
                    v-model="name"
                    @emit-value="(value) => (name = value)"
                />
                <Input
                    placeholder="username"
                    inputType="text"
                    label="Username"
                    v-model="username"
                    @emit-value="(value) => (username = value)"
                />
                <Input
                    placeholder="password"
                    inputType="password"
                    label="Password"
                    v-model="password"
                    @emit-value="(value) => (password = value)"
                />
                <button
                    class="w-full h-[40px] mb-2 hover:bg-blue-900 transition-colors bg-blue-950 text-white rounded-lg self-center"
                    @click="handleClickRegiser"
                >
                    Register
                </button>
            </div>
            <span class="text-gray-800">
                Already have a account?
                <b
                    ><router-link to="/auth/login" class=""
                        >Login</router-link
                    ></b
                >
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
// import { OhVueIcon } from "oh-vue-icons";
import { useAuthStore } from "../store/auth/useAuthStore";
import Input from "../components/Input.vue";

const name = ref("");
const username = ref("");
const password = ref("");

const store = useAuthStore();

const { register } = store;

const handleClickRegiser = () => {
    // console.log(name.value, username.value, password.value);
    register(name.value, username.value, password.value);
};
</script>
