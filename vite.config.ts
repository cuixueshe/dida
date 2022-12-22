/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuejsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    environment:"jsdom"
  },
  plugins: [vuejsx(), vue()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
