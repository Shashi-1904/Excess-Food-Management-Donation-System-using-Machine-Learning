import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',  // Use jsdom for DOM testing
    setupFiles: './src/setupTests.js',
    exclude: [...configDefaults.exclude],
  }
});
