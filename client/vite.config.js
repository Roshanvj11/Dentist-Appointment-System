import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    // port: 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:5000/',
        // changeOrigin: true,
        secure: false,
        timeout: 60000,
      },
    },
    '/socket.io': {
      target: 'ws://localhost:5000/',
       changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
});
