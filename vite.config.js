import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    optimizeDeps: {
        exclude: ["oh-vue-icons/icons"],
        include: ["quill"],
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
