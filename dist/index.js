'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logs = require('./lib/logs/logs.lib');

var _logs2 = _interopRequireDefault(_logs);

var _config3 = require('./server/models/config.model');

var _config4 = _interopRequireDefault(_config3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register');
require('babel-polyfill');

global.Promise = require('bluebird');

_mongoose2.default.Promise = Promise;

var dbConf = _config2.default.get('MONGODB');
var dbAddr = 'mongodb://' + (dbConf.auth ? dbConf.user + ':' + dbConf.pass + '@' : '') + dbConf.host + ':' + dbConf.port + '/' + dbConf.db;

_mongoose2.default.connect(dbAddr, { useMongoClient: true }).then(function (db) {
  _logs2.default.info('The database connection is successful.');
  _config4.default.findOne().then(function (doc) {
    if (doc) {
      _logs2.default.info('Server configuration load the success!');
      global.__config = doc;
      require('./bin/server');
    } else {
      _logs2.default.error('Server configuration data loss!');
      process.exit(1);
    }
  }).catch(function (err) {
    throw err;
  });
});

_mongoose2.default.connection.on('error', function () {
  throw new Error('Unable to connect to database: ' + dbAddr);
});
//# sourceMappingURL=index.js.map
