import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import packageJSON from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJSON.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [typescript(), json()],
  external: ["react", "react-dom"],
};
