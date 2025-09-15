import { useAuthStore } from "../store";
import { mixin } from "../components/commom/customSwal";
import { API_URL } from "../constants";
import { notesApi } from "../api";

//@ts-check
export const authGuard = async (to, from, next) => {
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
            // Call REST endpoint to refresh token
            const response = await notesApi.get(`${API_URL}/auth/refresh-token`);

            console.log(response);
            
            const token = response.data.token;

            store.setAccesToken(token);

            return next();

        } catch (error) {
            console.error('Network error on refresh token:', error.message);
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
