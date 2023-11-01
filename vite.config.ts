import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nativeHashPlugin from './nativesHashPlugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    vue(),
    nativeHashPlugin()
  ]
})
