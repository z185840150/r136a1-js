'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _promiseRedis = require('promise-redis');

var _promiseRedis2 = _interopRequireDefault(_promiseRedis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisConf = _config2.default.get('REDIS');

var client = _promiseRedis2.default.createClient(redisConf.port, redisConf.host);

redisConf.auth && client.auth(redisConf.pass);

exports.default = client;
module.exports = exports['default'];
//# sourceMappingURL=redis.lib.js.map
