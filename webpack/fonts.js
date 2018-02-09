module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000,
            mimetype: "application/font-woff",
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  }
});
