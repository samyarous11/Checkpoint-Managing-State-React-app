import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration - uses the standard React plugin (Babel-based Fast Refresh)
export default defineConfig({
  plugins: [react()],
})
