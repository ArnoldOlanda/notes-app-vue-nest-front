<template>
    <div
        class="w-[100%] h-screen bg-[url('/bg.jpg')] bg-cover flex justify-center items-center"
    >
        <div
            class="container w-[28%] min-w-[350px] w-max[600px] border-2 bg-white text-blue-800 drop-shadow-xl h-[80%] rounded-lg p-4 flex gap-3 flex-col items-center justify-around"
        >
            <div class="mt-2">
                <v-icon name="fa-brain" scale="4" />
                <h2 class="text-2xl font-bold">Vue + Nestjs Auth App</h2>
                <h3 class="text-xl mt-12">Welcome</h3>
                <h4 class="text-gray-500">Login to your account</h4>
            </div>
            <div class="flex flex-col w-full gap-5 pl-10 pr-10">
                <Input
                    placeholder="user"
                    v-model="user"
                    inputType="text"
                    label="Username"
                    @emit-value="setValueUser"
                />
                <Input
                    placeholder="password"
                    v-model="password"
                    inputType="password"
                    label="Password"
                    @emit-value="setValuePassword"
                />
                <button
                    class="w-full h-[40px] mb-2 hover:bg-blue-900 transition-colors bg-blue-950 text-white rounded-lg self-center"
                    @click="handleClickLogin"
                >
                    Login
                </button>
                <span class="text-gray-800">
                    Don`t have a account?
                    <b
                        ><router-link to="/auth/register" class=""
                            >Register</router-link
                        ></b
                    >
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { OhVueIcon } from "oh-vue-icons";

import Input from "../components/Input.vue";
import { useAuthStore } from "../store/auth/useAuthStore";

export default {
    components: {
        Input,
        "v-icon": OhVueIcon,
    },
    setup() {
        const router = useRouter();
        const user = ref("");
        const password = ref("");

        const store = useAuthStore();

        const { login } = store;

        const handleClickLogin = async () => {
            try {
                await login(user.value, password.value);
                if (store.auth !== "not-authenticated")
                    router.push({ name: "home" });
                else alert(store.errorMessage);
            } catch (error) {}
        };

        const setValueUser = (value) => {
            user.value = value;
        };

        const setValuePassword = (value) => {
            password.value = value;
        };

        return {
            user,
            password,
            setValueUser,
            setValuePassword,
            handleClickLogin,
        };
    },
};
</script>
