import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for all assets
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate lucide-react into its own chunk
          lucide: ['lucide-react']
        }
      }
    }
  },
});
