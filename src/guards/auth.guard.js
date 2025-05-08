import { useAuthStore } from "../store";
import apolloClient from "../graphql";
import { gql } from "@apollo/client/core";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { computed } from "vue";

//@ts-check
export const authGuard = async (to, from, next) => {
    const store = useAuthStore();
    if (to.query.token && to.query.email) {
        const { token, email, id, name, avatar } = to.query;
        store.loginWithGoogle(token, {
            id,
            name,
            email,
            avatar,
        });
        next();
        return;
    }

    if(from.name === "login" || from.name === "register"){
        next();
        return;
    }

    if (store.authState.token) {
        try {
            // Usando provideApolloClient según la documentación oficial
            const query = await apolloClient.query({
                query: gql`
                    query RefreshToken {
                        refreshToken {
                            token
                        }
                    }
                `
            })

            const token = query.data?.refreshToken?.token;
            
            if (token) {
                store.setAccesToken(token);
                next();
            } else {
                store.logout();
                return next({ name: "login" });
            }
        } catch (error) {
            console.log(error);

            if (error.response?.status === 401 || error.networkError?.statusCode === 401) {
                store.logout();
                return next({ name: "login" });
            }
        }
    } else {
        return next({ name: "login" });
    }
};
