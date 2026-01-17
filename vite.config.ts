import { join } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import unocss from "unocss/vite"
import unimport from "unimport/unplugin"
import dotenv from "dotenv"
import { projectDir } from "./shared/dir"
import pwa from "./pwa.config"

dotenv.config({
  path: join(projectDir, ".env.server"),
})

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "~": join(projectDir, "src"),
      "@shared": join(projectDir, "shared"),
    },
  },
  plugins: [
    unimport.vite({
      dirs: ["src/hooks", "shared", "src/utils", "src/atoms"],
      presets: ["react", {
        from: "jotai",
        imports: ["atom", "useAtom", "useAtomValue", "useSetAtom"],
      }],
      imports: [
        { from: "clsx", name: "clsx", as: "$" },
        { from: "jotai/utils", name: "atomWithStorage" },
      ],
      dts: "imports.app.d.ts",
    }),
    unocss(),
    react(),
    pwa(),
    // nitro(),  // Temporarily disabled - Nitro server running separately on port 3001
  ],
})
