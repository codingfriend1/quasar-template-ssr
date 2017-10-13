const
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const
  env = require('./env-utils'),
  config = require('../config'),
  vueConfig = require('./vue-loader.config')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  devtool: env.prod
    ? false
    : '#cheap-module-source-map',
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: merge(
      {
        quasar: resolve(`node_modules/quasar-framework/dist/quasar.${env.platform.theme}.esm.js`),
        'quasar-theme': resolve(`src/themes/app.${env.platform.theme}.styl`),
        variables: resolve(__dirname, 'src/themes/quasar.variables.styl')
      },
      config.aliases
    )
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: env.prod ? 'warning' : false
  },
  plugins: env.prod
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
