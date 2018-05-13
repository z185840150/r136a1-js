'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _logger = require('./../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_app2.default);
var serverConfig = _config2.default.get('SERVER');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  var bind = typeof port === 'string' ? 'Pipe ' + __config.server.port : 'Port ' + __config.server.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      _logger2.default.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      _logger2.default.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  _logger2.default.info('Server listening on ' + bind);
}

global.__sockets = {};

server.listen(normalizePort(serverConfig.port), serverConfig.host);
server.on('error', onError);
server.on('listening', onListening);

// require('./../server/modules/crawler/crawler.9188')
// require('./../server/modules/crawler/com.dszuqiu')
require('./../server/modules/proxy/cn.ip66');
//# sourceMappingURL=server.js.map
