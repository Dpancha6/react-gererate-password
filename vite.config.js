import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-gererate-password/",
  // root: './',
  // input: '/react-gererate-password/src/main.jsx',
  plugins: [react()],
});
