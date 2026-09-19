import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Serve index.html for any unknown path (SPA routing)
    historyApiFallback: true,
  },
});
