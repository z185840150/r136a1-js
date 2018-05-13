'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _connectTimeout = require('connect-timeout');

var _connectTimeout2 = _interopRequireDefault(_connectTimeout);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _vueServerRenderer = require('vue-server-renderer');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rateLimitRedis = require('rate-limit-redis');

var _rateLimitRedis2 = _interopRequireDefault(_rateLimitRedis);

var _logs = require('./../lib/logs/logs.lib');

var _logs2 = _interopRequireDefault(_logs);

var _redis = require('./../lib/redis/redis.lib');

var _redis2 = _interopRequireDefault(_redis);

var _index = require('../server/routes/index.route');

var _index2 = _interopRequireDefault(_index);

var _APIError = require('../server/helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _connectTimeout2.default)('5s'));

app.use(_bodyParser2.default.json({ limit: '512kb' })); // application/json
app.use(_bodyParser2.default.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());
// view engine setup
app.set('views', _path2.default.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
app.use(_express2.default.static(_path2.default.join(__dirname, 'server/public')));
// secure apps by setting various HTTP headers
app.use((0, _helmet2.default)());
// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token, Cross-Origin');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', 'Flower LOTTERY DC API 1.0');
  next();
});
__config.server.safe.rate.enable && app.use(new _expressRateLimit2.default({
  store: new _rateLimitRedis2.default({ client: _redis2.default }),
  windowMs: __config.server.safe.rate.windowMs,
  delayAfter: __config.server.safe.rate.delayAfter,
  delayMs: __config.server.safe.rate.delayMs,
  max: __config.server.safe.rate.max,
  message: '429',
  onLimitReached: function onLimitReached(req, res, options) {
    _logs2.default.warn('IP\u4E3A ' + req.ip + ' \u7684\u5BA2\u6237\u7AEF\u77ED\u671F\u5185\u5927\u91CF\u6B21\u6570\u8BBF\u95EE ' + req.route.path + ' \u63A5\u53E3');
  }
}));

// mount all routes on /api path
app.use('/api', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    var unifiedErrorMessage = err.errors.map(function (error) {
      return error.messages.join('. ');
    }).join(' and ');
    var error = new _APIError2.default(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof _APIError2.default)) {
    var apiError = new _APIError2.default(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new _APIError2.default('API not found', _httpStatus2.default.NOT_FOUND);
  return next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// SSR
var resolve = function resolve(file) {
  return _path2.default.resolve(__dirname, file);
};

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return (0, _vueServerRenderer.createBundleRenderer)(bundle, Object.assign(options, {
    template: template,
    // for component caching
    cache: (0, _lruCache2.default)({ max: 1000, maxAge: 1000 * 60 * 15 }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./public'),
    // recommended for performance
    runInNewContext: false
  }));
}

exports.default = app;
module.exports = exports['default'];
//# sourceMappingURL=app.js.map
