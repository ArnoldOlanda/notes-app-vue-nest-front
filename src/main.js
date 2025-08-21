import { createApp, h, provide } from "vue";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import Swal from "sweetalert2";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import GoogleSignInPlugin from "vue3-google-signin"
import { DefaultApolloClient } from "@vue/apollo-composable";

import { pinia } from "./store";
import router from "./router";
import apolloClient from "./graphql";
import App from "./App.vue";

import en from "./lang/en.json";
import es from "./lang/es.json";

import 'sweetalert2/dist/sweetalert2.min.css';
import "./style.css";

//Icons
const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

//I18n
const i18n = createI18n({
    locale: "es",
    fallbackLocale: "en",
    messages: {
        en,
        es,
    },
});

const app = createApp(App);

//Sweetalert
window.Swal = Swal;

app.provide(DefaultApolloClient,apolloClient);

app.component("v-icon", OhVueIcon);

app
    .use(router)
    .use(pinia)
    .use(GoogleSignInPlugin, {
        clientId: '959892386497-mhk3jdge5do3gsfcnqt0qiro3ceocjj1.apps.googleusercontent.com',
    })
    .use(i18n)
    .mount("#app");
