import { defineConfig, loadEnv } from "vite";
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
