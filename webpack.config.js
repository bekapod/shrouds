const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackShellPlugin = require("webpack-shell-plugin");
const browserSyncPlugin = require("./webpack/browserSync");
const stylesPlugin = require("./webpack/styles");
const imagesPlugin = require("./webpack/images");
const svgPlugin = require("./webpack/svg");
const fontsPlugin = require("./webpack/fonts");
const scriptsPlugin = require("./webpack/scripts");
const sourceMapsPlugin = require("./webpack/sourceMaps");
const minifyPlugin = require("./webpack/minify");

const PATHS = {
  js: path.join(__dirname, "assets/src/js"),
  styles: path.join(__dirname, "assets/src/css/main.scss"),
  images: glob.sync(path.join(__dirname, "assets/src/images/**/*")),
  svg: glob.sync(path.join(__dirname, "assets/src/svg/**/*")),
  dist: path.join(__dirname, "assets/dist")
};

const extraneousFiles = [
  "images.bundle.js",
  "images.bundle.js.map",
  "styles.bundle.js",
  "styles.bundle.js.map",
  "svg.bundle.js",
  "svg.bundle.js.map"
].map(file => `${PATHS.dist}/${file}`);

const commonConfig = env =>
  merge([
    {
      entry: {
        global: ["babel-polyfill", PATHS.js],
        styles: PATHS.styles,
        images: PATHS.images,
        svg: PATHS.svg
      },

      output: {
        path: PATHS.dist,
        filename: "[name].bundle.js"
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: ({ resource }) => /node_modules/.test(resource),
          deepChildren: true
        }),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(env.target)
        }),
        new WebpackShellPlugin({
          onBuildEnd: extraneousFiles.map(file => `rm -f ${file}`)
        })
      ]
    },
    stylesPlugin(),
    imagesPlugin(),
    svgPlugin(PATHS.svg),
    fontsPlugin(),
    scriptsPlugin({ include: PATHS.js }),
    sourceMapsPlugin({ type: "source-map" })
  ]);

const productionConfig = () =>
  merge([
    {
      plugins: [new CleanWebpackPlugin([PATHS.dist])]
    },
    minifyPlugin()
  ]);

const developmentConfig = env =>
  merge([
    {
      plugins: [new BundleAnalyzerPlugin()]
    },
    browserSyncPlugin(env)
  ]);

module.exports = env => {
  if (env.target === "production") {
    return merge(commonConfig(env), productionConfig(env));
  }

  return merge(commonConfig(env), developmentConfig(env));
};
