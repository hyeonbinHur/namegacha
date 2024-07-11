import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/namegacha/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
        coverage: {
            include: ['src/__test__/*.{js,jsx}'],
            exclude: ['src/mocks/*'],
        },
    },
});
