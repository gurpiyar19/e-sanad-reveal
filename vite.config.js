import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment - replace 'e-sanad-reveal' with your repo name
  base: process.env.NODE_ENV === 'production' ? '/e-sanad-reveal/' : '/',
})
