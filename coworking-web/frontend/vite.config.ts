import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:4000',
        changeOrigin: true,
        secure: false // Permite certificados autofirmados en desarrollo
      }
    }
  }
});
