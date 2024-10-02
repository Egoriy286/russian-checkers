import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    //proxy: {
    //  '/api': {
    //    target: 'http://localhost:8080',
    //    changeOrigin: true,
    //    rewrite: (path) => path.replace(/^\/api/, ''),
    //  },
    //},
  }
  
})
function viteServerProxy(arg0: { target: string }): import("vite").PluginOption {
  throw new Error('Function not implemented.')
}

