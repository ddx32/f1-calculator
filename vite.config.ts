import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: "build",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://f1calculator.com",
        changeOrigin: true,
      },
    },
  },
});
