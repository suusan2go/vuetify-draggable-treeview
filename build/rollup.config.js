import commonjs from "rollup-plugin-commonjs"; // CommonJS モジュールを ES6 に変換
import vue from "rollup-plugin-vue"; // .vue 単一ファイルコンポーネントを取得
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.js",
  output: {
    name: "VuetifyDraggableTreeview",
    exports: "named"
  },
  external: ["vue", "vuedraggable"],
  plugins: [
    vue({ css: false }),
    commonjs(),
    typescript({
      tsconfig: true
    })
  ]
};
