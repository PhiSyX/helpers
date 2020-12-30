import tsResolver from "vite-tsconfig-paths";

import { join, resolve } from "path";
import { UserConfig as ViteUserConfig } from "vite";

import { localHost, localNetworkHttps, localPort } from "../server/https.ts";

const config: ViteUserConfig = {
  optimizeDeps: { auto: true },

  hostname: localHost,
  port: localPort,
  https: true,
  httpsOptions: localNetworkHttps({ join, resolve }),

  cssCodeSplit: true,
  minify: "esbuild",
  sourcemap: false,

  resolvers: [tsResolver],
};

export default config;
