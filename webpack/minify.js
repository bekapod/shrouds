const webpack = require("webpack");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

module.exports = () => ({
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new PrepackWebpackPlugin(),
    new UglifyWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano
    })
  ]
});
