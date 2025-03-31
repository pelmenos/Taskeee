// noinspection JSUnusedGlobalSymbols

import { defineConfig, loadEnv, UserConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        app: "/src/app",
        pages: "/src/pages",
        widgets: "/src/widgets",
        features: "/src/features",
        entities: "/src/entities",
        shared: "/src/shared",
      },
    },
    server: {},
  }

  if (mode !== "production") {
    /*
    A proxy in a dev environment is needed so that the frontend developer can sip on smoothies
    if the backend developer didn't take care of CORS.
    (c) ilfey
    */
    config.server.proxy = {
      "/api": {
        target: env.VITE_PUBLIC_API_URL,
      },
    }
  }

  return config
})
