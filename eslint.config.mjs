import { ourongxing, react } from "@ourongxing/eslint-config"

export default ourongxing({
  type: "app",
  // 貌似不能 ./ 开头，
  ignores: [
    "src/routeTree.gen.ts",
    "src_back/routeTree.gen.ts",
    ".nitro",
    "**/.nitro",
    "imports.app.d.ts",
    "public/",
    ".vscode",
    "**/*.json",
    "**/*.txt",
    "**/*.env*",
  ],
}).append(react({
  files: ["src/**"],
})).append({
  rules: {
    "node/prefer-global/process": "off",
  },
})
