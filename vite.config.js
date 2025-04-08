import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/card-matching-game/", // Set this to your repository name
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    minify: true,
  },
});
