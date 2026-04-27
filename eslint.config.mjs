import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This translates the legacy configs into the Flat Config format
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override default ignores here
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/scripts/**",
      "src/migrations/**"
    ],
  },
];

export default eslintConfig;