import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173, // Matches your CORS 'localhost:5173' setting
  },
  build: {
    outDir: 'dist', // Matches the 'Publish directory' you set in Netlify
  }
})