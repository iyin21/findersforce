import react from "@vitejs/plugin-react"
import { configDefaults } from "vitest/config"

import { defineConfig } from "vite"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
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
        port: 3000
    }
})
