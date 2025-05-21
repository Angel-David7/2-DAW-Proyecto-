import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
	proxy: {
  	'/api': {
    	target: 'http://localhost:4000',
    	changeOrigin: true,
    	secure: false
  	}
	}
  }
});
