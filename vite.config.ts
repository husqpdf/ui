import {defineConfig} from "vite";
import {resolve} from "path"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        vue(),
        dts(),
    ],
    build: {
        target: "esnext",
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            formats: ["es"]
        },
        rollupOptions: {
            external: ['vue', 'vue-router'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
        }
    }
})