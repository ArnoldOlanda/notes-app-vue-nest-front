//@ts-check
import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

import { loginService } from "../../services/login.service";
import { registerService } from "../../services/register.service";

export const useAuthStore = defineStore("auth", () => {
    const auth = ref("not-authenticated");
    const user = ref({});
    const token = ref("");
    const isLoading = ref(false);
    const errorMessage = ref("");

    const authState = useStorage("auth_state", {
        auth: "authenticated",
        user: {},
        token: "",
        isLoading: false,
        errorMessage: "",
    });

    const login = async (username = "", password = "") => {
        // isLoading.value = true;
        authState.value.isLoading = true;
        try {
            const data = await loginService(username, password);
            authState.value.isLoading = false;

            if (data.status === 401) {
                authState.value.errorMessage = data.response;
            } else {
                authState.value.auth = "authenticated";
                authState.value.user = data.user;
                authState.value.token = data.token;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authState.value.auth = "not-authenticated";
        authState.value.user = {};
        authState.value.token = "";
    };

    const register = async (name = "", username = "", password = "") => {
        try {
            const data = await registerService(name, username, password);

            alert("Register Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return {
        //State
        // auth,
        // user,
        // token,
        // errorMessage,
        authState,

        //Actions
        login,
        logout,
        register,
    };
});
