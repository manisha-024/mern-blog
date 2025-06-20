import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin: true,  
        secure: false,
        cookieDomainRewrite: 'localhost', // Add this
        cookiePathRewrite: '/', // Add this
      },
    },
  },
  plugins: [tailwindcss(), react(), flowbiteReact()],
  darkMode: 'class',
})