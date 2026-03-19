import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  envDir: "../",
  publicDir: "assets",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
