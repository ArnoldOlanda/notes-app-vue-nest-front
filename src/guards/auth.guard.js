import { gql } from "@apollo/client/core";
import apolloClient from "../graphql";
import { useAuthStore } from "../store";
import { mixin } from "../components/commom/customSwal";

//@ts-check
export const authGuard = async (to, from, next) => {
    console.log(from);
    
    const store = useAuthStore();
    
    // Handle Google OAuth callback
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
    
    // Check if route requires authentication
    if (!to.meta.requiresAuth) {
        next();
        return;
    }

    // If user has a token, verify it's still valid
    if (store.authState.token) {
        try {
            // Refresh token to verify it's still valid
            const query = await apolloClient.query({
                query: gql`
                    query RefreshToken {
                        refreshToken {
                            token
                        }
                    }
                `,
                fetchPolicy: 'network-only' // Don't use cache for this query
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
            console.error(error.message);
            mixin({
                icon: 'error',
                title: 'Session expired, please login again',
            })
            store.logout();
            return next({ name: "login" });
        }
    } else {
        return next({ name: "login" });
    }
};
