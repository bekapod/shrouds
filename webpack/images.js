const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 15000,
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  },

  plugins: [new ImageminPlugin({ test: /\.(jpg|png|gif)$/i })]
});
