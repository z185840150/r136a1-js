'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [require('autoprefixer')({
    browsers: ['last 3 versions']
  })]
};
module.exports = exports['default'];
//# sourceMappingURL=vue-loader.config.js.map
