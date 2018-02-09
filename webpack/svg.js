const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "svg-defs.svg"
            }
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [{ removeTitle: true }]
            }
          }
        ]
      }
    ]
  },

  plugins: [new SpriteLoaderPlugin()]
});
