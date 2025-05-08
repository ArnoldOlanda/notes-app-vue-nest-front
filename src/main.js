import { createApp, h, provide } from "vue";
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

import 'sweetalert2/dist/sweetalert2.min.css';
import "./style.css";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

const app = createApp(App);

app.provide(DefaultApolloClient,apolloClient);

//Sweetalert

window.Swal = Swal;


app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).use(GoogleSignInPlugin, {
    clientId: '959892386497-mhk3jdge5do3gsfcnqt0qiro3ceocjj1.apps.googleusercontent.com',
}).mount("#app");
