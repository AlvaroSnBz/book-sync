import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    proxy: {
      '/book': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: { chunkSizeWarningLimit: 1600 },
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, '../backend'),
      '@frontend': path.resolve(__dirname, '../frontend'),
    },
  },
});
