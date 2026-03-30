import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Ansh_Portfolio/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
