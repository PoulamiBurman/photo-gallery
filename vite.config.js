import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Dev proxy in case the picsum API ever blocks cross-origin requests.
    proxy: {
      '/picsum': {
        target: 'https://picsum.photos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/picsum/, ''),
      },
    },
  },
});
