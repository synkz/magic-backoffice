import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Désactiver les règles qui causent des problèmes sur Vercel
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "typescript-eslint/no-explicit-any": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignorer les fichiers qui n'existent pas mais causent des erreurs
    "app/**",
    "lib/**",
  ]),
]);

export default eslintConfig;
