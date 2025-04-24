import pluginNext from "@next/eslint-plugin-next";
export default [
  {
    plugins: { "@next/next": pluginNext },
    rules: { ...pluginNext.configs.recommended.rules },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: { ...pluginNext.configs.recommended.rules },
  },
];
