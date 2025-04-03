// noinspection JSUnusedGlobalSymbols

import { UserConfig , defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const config: UserConfig = {
    plugins: [
      react({ plugins: [['@effector/swc-plugin', {}]] }),
      tsconfigPaths(),
    ],
    server: {},
  }

  if (mode !== "production") {
    /*
    A proxy in a dev environment is needed so that the frontend developer can sip on smoothies
    if the backend developer didn't take care of CORS.
    (c) ilfey
    */
    config.server!.proxy = {
      "/api": {
        target: env.VITE_PUBLIC_API_URL,
      },
    }
  }

  return config
})
