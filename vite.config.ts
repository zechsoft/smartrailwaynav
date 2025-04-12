import  { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fix for JDoodle preview environment
    hmr: {
      protocol: 'wss',
      clientPort: 443,
      host: '0.0.0.0',
    }
  }
})
 