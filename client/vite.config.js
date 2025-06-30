import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-blog-api-t4f0.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [tailwindcss(), react(), flowbiteReact()],
  darkMode: 'class',
})