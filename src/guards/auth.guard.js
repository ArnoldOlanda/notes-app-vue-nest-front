import { revalidateToken } from "../services/auth.service";
import { useAuthStore } from "../store";

//@ts-check
export const authGuard = async (to, from, next) => {
    const store = useAuthStore();
    if(to.query.token && to.query.email){
        const {token, email, id, name, avatar} = to.query;
        store.loginWithGoogle(token, {
            id,
            name,
            email,
            avatar
        });
        next();
        return;
    }

    if(store.authState.token){
        try {
            const {token} = await revalidateToken(store.authState.token);
            store.setAccesToken(token);
            next();
        } catch (error) {
            console.log(error);
            
            if(error.response.status === 401){
                store.logout();
                return next({name: "login"});
            }
        }
    } else {
        return next({name: "login"});
    }
}