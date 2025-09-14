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
        include: [
            'quill',
            'quill-emoji',
            'quill-blot-formatter',
            'vue3-quill'
        ]
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
    },
});
