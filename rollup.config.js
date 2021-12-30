import typescript from "rollup-plugin-typescript2";
import packages from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packages.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [typescript()],
  external: ["react", "react-dom"],
};
