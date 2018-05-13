'use strict';

var path = require('path');
var webpack = require('webpack');
var vueConfig = require('./vue-loader.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';
var resolve = function resolve(file) {
  return path.resolve(__dirname, file);
};

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'assets': resolve('../assets'),
      'components': resolve('../components'),
      'examples': resolve('../pages/examples'),
      'layouts': resolve('../layouts'),
      'mixins': resolve('../mixins'),
      'pages': resolve('../pages'),
      'public': resolve('../public'),
      'router': resolve('../router'),
      'static': resolve('../static'),
      'store': resolve('../store'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ['vue-style-loader', 'css-loader']
    }, {
      test: /\.styl$/,
      loader: ['vue-style-loader', 'css-loader', 'stylus-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ? [new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }), new ExtractTextPlugin({
    filename: 'common.[chunkhash].css'
  }), new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/
  })] : [new FriendlyErrorsPlugin()]
};
//# sourceMappingURL=webpack.base.config.js.map
