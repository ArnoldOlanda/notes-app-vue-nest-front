//@ts-check
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useMutation, useQuery } from "@vue/apollo-composable";

import { LOGIN_MUTATION } from "../../graphql/mutations/login.mutation";
import { REGISTER_MUTATION } from "../../graphql/mutations/register.mutation";
import { ApolloError } from "@apollo/client/errors";
import { FORGOT_PASSWORD_MUTATION } from "../../graphql/mutations/forgotPassword.mutation";


export const useAuthStore = defineStore("auth", () => {

    const authState = useStorage("auth_state", {
        auth: "not-authenticated",
        user: {},
        token: "",
        errorMessage: "",
    });

    const { mutate: loginMutation, loading: loginLoading } = useMutation(LOGIN_MUTATION);
    const { mutate: registerMutation, loading: registerLoading } = useMutation(REGISTER_MUTATION);
    const { mutate: forgotPasswordMutation, loading: forgotPasswordLoading } = useMutation(FORGOT_PASSWORD_MUTATION);
    
    const login = async (email = '', password = '') => {
        try {
            const result = await loginMutation({ email, password });
            if(result?.data?.login){
                const { token, user } = result.data.login;
                authState.value.auth = "authenticated";
                authState.value.user = user;
                authState.value.token = token;
            }
        } catch (error) {
            if(error instanceof ApolloError && error.networkError) {
                throw new Error("Cannot connect to the server. Please check your internet connection.");
            }
            throw error;
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

    const forgotPassword = async (email) => {
        try {
            const result = await forgotPasswordMutation({ email });
            if(result?.data?.forgotPassword){
                const { message } = result.data.forgotPassword;
                authState.value.errorMessage = message;
            }
        } catch (error) {
            if(error instanceof ApolloError && error.networkError) {
                throw new Error("Cannot connect to the server. Please check your internet connection.");
            }
            throw error;
        }
    }

    const setAccesToken = (token) => {
        authState.value.token = token
    }

    const clearAccesToken = () => {
        authState.value.token = ""
    }

    const loginWithGoogle = (token, payload) => {
        console.log({ token, payload });
        
        try {
            authState.value.auth = "authenticated";
            authState.value.user = {
                ...payload,
                id: +payload.id,
            };
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
        forgotPasswordLoading,

        //Actions
        login,
        loginWithGoogle,
        register,
        forgotPassword,
        logout,
        setAccesToken,
        clearAccesToken
    };
});
