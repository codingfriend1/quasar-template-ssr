const
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  nodeExternals = require('webpack-node-externals'),
  VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

  const
    webpackConfig = require('./webpack.base.config'),
    env = require('./env-utils')

module.exports = merge(webpackConfig, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.dev ? 'development' : 'production'),
      'process.env.VUE_ENV': '"server"',
      'DEV': env.dev,
      'PROD': env.prod,
      'CLIENT': false,
      'SERVER': true
    }),
    new VueSSRServerPlugin()
  ]
})
