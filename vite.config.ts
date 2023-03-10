/* eslint-disable new-cap */
import react from "@vitejs/plugin-react"
import { configDefaults } from "vitest/config"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { defineConfig } from "vite"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            process: "process/browser",
            util: "util",
            buffer: "buffer",
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./test/test-setup.ts",
        exclude: [...configDefaults.exclude, "**/*.spec.ts"],
        open: true,
    },
    server: {
        port: 3000,
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: "globalThis",
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
})
