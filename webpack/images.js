const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  },

  plugins: [new ImageminPlugin({ test: /\.(jpg|jpeg|png|gif)$/i })]
});
