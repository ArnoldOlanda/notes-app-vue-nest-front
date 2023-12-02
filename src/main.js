import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);
const pinia = createPinia();
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(router).use(pinia).mount("#app");
