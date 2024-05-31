import {defineConfig} from "vite";
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import tailwindcss from "tailwindcss"

export default defineConfig({
    plugins: [
        vue(),
        dts(),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            formats: ["es"]
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
        }
    }
})