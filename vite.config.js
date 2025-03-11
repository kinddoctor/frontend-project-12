import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // base: '/',
  plugins: [react(), svgr({ include: '**/*.svg' })],
  server: {
    port: 5002,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5001',
      },
    },
  },
});
