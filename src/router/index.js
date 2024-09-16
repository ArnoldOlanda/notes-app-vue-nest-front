import * as VueRouter from "vue-router";
import { useAuthStore } from "../store/auth/useAuthStore";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import PageNotFound from "../views/404.vue";
import { authGuard } from "../guards/auth.guard";

const routes = [
    {
        path: "/auth",
        children: [
            { path: "login", name: "login", component: Login },
            { path: "register", name: "register", component: Register },
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
    { path: "/", redirect: "auth/login" },
    { path: "/:pathMatch(.*)*", name: "404", component: PageNotFound },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

export default router;
