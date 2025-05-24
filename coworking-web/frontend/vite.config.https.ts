import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
