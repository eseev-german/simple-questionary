import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get the repository name for GitHub Pages
const getRepoName = () => {
  // This uses the current directory name as a fallback
  const repoName = process.cwd().split('\\').pop() || 'questionnaire-tool';
  return repoName;
};

// For GitHub Pages deployment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? `/${getRepoName()}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: base, // Set the base URL for GitHub Pages
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
