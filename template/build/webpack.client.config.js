const
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  SWPrecachePlugin = require('sw-precache-webpack-plugin'),
  VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const
  webpackConfig = require('./webpack.base.config'),
  env = require('./env-utils')

module.exports = merge(webpackConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.dev ? 'development' : 'production'),
      'process.env.VUE_ENV': '"client"',
      'DEV': env.dev,
      'PROD': env.prod,
      'CLIENT': true,
      'SERVER': false
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})
