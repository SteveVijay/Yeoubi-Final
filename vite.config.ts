import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import path from "path";

export default defineConfig({
  server: {
    host: true,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
    }),
    react(),
  ],
});
