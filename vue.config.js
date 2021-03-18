const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require("path");
module.exports = {
  lintOnSave: false,
  parallel: false,
  productionSourceMap: false,
  pages: {
    index: {
      entry: "./src/main.ts",
      title: "报表生成器",
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== "production",
  },
  // devServer: {
  //   port: 8688,
  //   proxy: {
  //     "/apis": {
  //       target: process.env.VUE_APP_API_HOST,
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         "/apis": "",
  //       },
  //     },
  //   },
  // },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));
  },
  configureWebpack: () => {
    let res = {};
    if (process.env.NODE_ENV === "production") {
      res.plugins = [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false,
        }),
        new BundleAnalyzerPlugin(),
      ];
    }
    return res;
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/style/varibles.less")],
    });
}
