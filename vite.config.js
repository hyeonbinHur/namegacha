// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/namegacha/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      include: ["src/__test__/*.{js,jsx}"],
      exclude: ["src/mocks/*"],
    },
  },
  build: {
    target: "esnext", // 최신 자바스크립트 표준으로 설정
    esbuild: {
      loader: "tsx", // TypeScript와 JSX를 처리할 수 있도록 설정
      jsxInject: 'import React from "react"', // React JSX 자동 주입
    },
  },
});
