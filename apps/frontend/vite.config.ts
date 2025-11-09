import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@workspace/shared/global.css": path.resolve(
        __dirname,
        "../../packages/shared/src/styles/global.css"
      ),
      "@workspace/shared": path.resolve(__dirname, "../../packages/shared/src"),
    },
  },
});
