import { createApp } from "vue";
import { createPinia } from "pinia";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";
import GoogleSignInPlugin from "vue3-google-signin"

import "./style.css";
import App from "./App.vue";
import router from "./router";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
const pinia = createPinia();
const app = createApp(App);

//Sweetalert
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
window.Swal = Swal;


app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).use(GoogleSignInPlugin, {
    clientId: '959892386497-mhk3jdge5do3gsfcnqt0qiro3ceocjj1.apps.googleusercontent.com',
}).mount("#app");
