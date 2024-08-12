import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 5173, 
    strictPort: true,
    host: true , 
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
    }
  }
});
