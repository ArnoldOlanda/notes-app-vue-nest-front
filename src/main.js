import { createApp } from "vue";
import { createPinia } from "pinia";
import { addIcons, OhVueIcon } from "oh-vue-icons";

import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
const pinia = createPinia();
const app = createApp(App);

//Sweetalert
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
window.Swal = Swal;


app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).mount("#app");
