import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'framer-motion';
          if (id.includes('node_modules/react-icons')) return 'react-icons';
          if (id.includes('node_modules/react')) return 'vendor';
          if (id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/react-router-dom')) return 'vendor';
        },
      },
    },
  },
})
