import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
// https://dev-pocaalbum-api.makeuni2026.com/apis/v1/pocaalbum/get_own_album_list_info/
// https://dev-pocaalbum-api.makeuni2026.com/apis/v1/pocaalbum/get_download_information_by_album_id/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        "/apis": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
