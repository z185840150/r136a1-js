'use strict';

var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var nodeExternals = require('webpack-node-externals');
var VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './assets/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: [/\.css$/, /vuetify/]
  }),
  plugins: [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }), new VueSSRServerPlugin()]
});
//# sourceMappingURL=webpack.server.config.js.map
