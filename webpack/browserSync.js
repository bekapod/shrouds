const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = env => ({
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: `${env.VM}`
    })
  ]
});
