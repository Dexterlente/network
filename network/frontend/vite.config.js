import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 8000
  // },
  build: {
    // generate manifest.json in outDir
    manifest: true,
    // rollupOptions: {
    //   // overwrite default .html entry
    //   input: '/frontend/src/main.jsx',
    // },
  },
})
