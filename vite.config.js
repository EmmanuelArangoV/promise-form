import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  publicDir: "assets",
  envDir: "../",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // root is set to 'src' so point to src/index.html explicitly
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
