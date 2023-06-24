import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://hostel-mgt-staging-0b2f0879c515.herokuapp.com",
        changeOrigin: true
      }
    }
  }
})
