//@ts-check
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useMutation } from "@vue/apollo-composable";

import { LOGIN_MUTATION } from "../../graphql/mutations/login.mutation";
import { REGISTER_MUTATION } from "../../graphql/mutations/register.mutation";


export const useAuthStore = defineStore("auth", () => {

    const authState = useStorage("auth_state", {
        auth: "not-authenticated",
        user: {},
        token: "",
        errorMessage: "",
    });

    const { mutate: loginMutation, loading: loginLoading } = useMutation(LOGIN_MUTATION);
    const { mutate: registerMutation, loading: registerLoading } = useMutation(REGISTER_MUTATION);
    
    const login = async (email = '', password = '') => {
        const result = await loginMutation({ email, password });
        if(result?.data?.login){
            const { token, user } = result.data.login;
            authState.value.auth = "authenticated";
            authState.value.user = user;
            authState.value.token = token;
        }
    }

    const register = async ({ name = "", email = "", password = "" }) => {
        const result = await registerMutation({ data: { name, email, password } });
        if (result?.data?.register) {
            const { token, user } = result.data.register;
            authState.value.auth = "authenticated";
            authState.value.user = user;
            authState.value.token = token;
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
        loginLoading,

        //Actions
        login,
        loginWithGoogle,
        register,
        logout,
        setAccesToken,
        clearAccesToken
    };
});
