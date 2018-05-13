'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = createRouter;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The meta data for your routes
var meta = require('./meta.json');

// Function to create routes
// Is default lazy but can be changed
function route(path, view) {
  return {
    path: path,
    meta: meta[path],
    component: function component(resolve) {
      return import('pages/' + view + 'View.vue').then(resolve);
    }
  };
}

_vue2.default.use(_vueRouter2.default);

function createRouter() {
  var router = new _vueRouter2.default({
    base: __dirname,
    mode: 'history',
    scrollBehavior: function scrollBehavior() {
      return { y: 0 };
    },
    routes: [route('/', 'Welcome'), route('/inspire', 'Inspire'),
    // Global redirect for 404
    { path: '*', redirect: '/' }]
  });

  // Send a pageview to Google Analytics
  router.beforeEach(function (to, from, next) {
    if (typeof ga !== 'undefined') {
      ga('set', 'page', to.path);
      ga('send', 'pageview');
    }
    next();
  });

  return router;
}
//# sourceMappingURL=index.js.map
