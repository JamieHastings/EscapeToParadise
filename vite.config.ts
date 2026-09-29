import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    // Strip all console.* calls and debugger statements from production builds
    // so internal error details and stack traces are never visible in DevTools
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
