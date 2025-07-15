import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' })],
  server: {
    port: 5002,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5001',
      },
      '/socket.io': {
        target: 'ws://127.0.0.1:5001',
        ws: true,
      },
    },
  },
})
