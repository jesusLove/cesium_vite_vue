import vue from "@vitejs/plugin-vue";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";
import { insertHtml, h } from "vite-plugin-insert-html";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    viteExternalsPlugin(
      {
        // key 是要外部化的依赖名，value 是全局访问的名称，这里填写的是 'Cesium'
        // 意味着外部化后的 cesium 依赖可以通过 window['Cesium'] 访问；
        // 支持链式访问，参考此插件的文档
        cesium: "Cesium",
      },
      {
        disableInServe: true, // 开发环境不外部话
      }
    ),
    // 自动处理 cesium 的四大静态文件
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium/Cesium.js',
          dest: 'libs/cesium'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Assets/*',
          dest: 'libs/cesium/Assets/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/ThirdParty/*',
          dest: 'libs/cesium/ThirdParty/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Workers/*',
          dest: 'libs/cesium/Workers/'
        },
        {
          src: 'node_modules/cesium/Build/CesiumUnminified/Widgets/*',
          dest: 'libs/cesium/Widgets/'
        },
      ]
    }),
    // cesium.js 外部化后， vite 进行打包，导致 build 找到 cesium.js 文件，需要将 cesium.js 通过 script 插入到 html 中。
    insertHtml({
      head: [h("script", { src: "libs/cesium/Cesium.js" })],
    }),
  ],
});
