import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isAndroid = process.env.BUILD_TARGET === 'android'

export default defineConfig({
  base: isAndroid ? './' : '/Cavadas-Academy_Player/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
