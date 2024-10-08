//@ts-check
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

import { loginService } from "../../services/login.service";
import { registerService } from "../../services/register.service";
import { swal } from "../../components/commom/customSwal";

export const useAuthStore = defineStore("auth", () => {

    const authState = useStorage("auth_state", {
        auth: "not-authenticated",
        user: {},
        token: "",
        isLoading: false,
        errorMessage: "",
    });

    const login = async (email = "", password = "") => {
        try {
            
            authState.value.isLoading = true;
            const data = await loginService(email, password);
            authState.value.isLoading = false;

            authState.value.auth = "authenticated";
            authState.value.user = data.user;
            authState.value.token = data.token;

        } catch (error) {            
            authState.value.isLoading = false;
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
            })
        }
    };

    const register = async ({ name = "", email = "", password = "" }) => {
        try {
            authState.value.isLoading = true;
            const data = await registerService(name, email, password);
            authState.value.isLoading = false;

            authState.value.auth = "authenticated";
            authState.value.user = data.user;
            authState.value.token = data.token;

        } catch (error) {
            console.log(error);
            authState.value.isLoading = false;
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
            })
        }
    };

    const setAccesToken = (token) => {
        authState.value.token = token
    }

    const clearAccesToken = () => {
        authState.value.token = ""
    }

    const loginWithGoogle = (token, payload) => {
        try {
            authState.value.auth = "authenticated";
            authState.value.user = payload;
            authState.value.token = token;
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        authState.value.auth = "not-authenticated";
        authState.value.user = {};
        authState.value.token = "";
    };

    return {
        //State
        authState,

        //Actions
        login,
        loginWithGoogle,
        logout,
        register,
        setAccesToken,
        clearAccesToken
    };
});
