import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/test-setup.ts',
        exclude: [
            ...configDefaults.exclude,
            '**/*.spec.ts',
        ],
        open: true,
    },
})
