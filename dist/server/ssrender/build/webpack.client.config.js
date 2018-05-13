'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var SWPrecachePlugin = require('sw-precache-webpack-plugin');
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

var config = merge(base, {
  entry: {
    app: './assets/entry-client.js'
  },
  plugins: [
  // strip dev-only code in Vue source
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"client"'
  }),
  // extract vendor chunks for better caching
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function minChunks(module) {
      // a module is extracted into the vendor chunk if...
      return (
        // it's inside node_modules
        /node_modules/.test(module.context) &&
        // and not a CSS file (due to extract-text-webpack-plugin limitation)
        !/\.css$/.test(module.request)
      );
    }
  }),
  // extract webpack runtime & manifest to avoid vendor chunk hash changing
  // on every build.
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }), new VueSSRClientPlugin()]
});

module.exports = config;
//# sourceMappingURL=webpack.client.config.js.map