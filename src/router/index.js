import * as VueRouter from "vue-router";
import { authGuard } from "../guards/auth.guard";
import { useAuthStore } from "../store/auth/useAuthStore";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import PageNotFound from "../views/404.vue";

const routes = [
    {
        path: "/auth",
        component: ()=> import("../layouts/AuthLayout.vue"),
        children: [
            { path: "login", name: "login", component: Login },
            { path: "register", name: "register", component: Register },
            { path: "forgot-password", name: "forgot-password", component: ForgotPassword },
            { path: "reset-password", name: "reset-password", component: ResetPassword },
        ],
    },
    {
        path: "/home",
        beforeEnter: authGuard,
        meta: { requiresAuth: true },
        children: [
            { path: "", name: "home", component: Home },
            { path: "profile", name: "profile", component: Profile },
        ],
    },
    { path: "/", redirect: "/home" },
    { path: "/:pathMatch(.*)*", name: "404", component: PageNotFound },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

export default router;
