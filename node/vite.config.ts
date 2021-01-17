import { join, resolve } from "path";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

import { localHost, localNetworkHttps, localPort } from "../server/https.ts";

export default defineConfig({
  alias: [
    { find: /^@\/(.*)/, replacement: "/<SOURCE_DIR>/$1" },
    { find: /^!\/(.*)/, replacement: "/<PACKAGE_DIR>/$1" },
  ],
  build: { minify: "esbuild" },
  plugins: [vue()],
  server: {
    host: localHost,
    port: localPort,
    https: localNetworkHttps({ join, resolve }),
  },
});
