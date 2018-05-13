import config from 'config'
import mongoose from 'mongoose'

import logs from './lib/logs/logs.lib'

import MOD_CONFIG from './server/models/config.model'

require('babel-core/register')
require('babel-polyfill')

global.Promise = require('bluebird')

mongoose.Promise = Promise

const dbConf = config.get('MONGODB')
const dbAddr = `mongodb://${dbConf.auth ? `${dbConf.user}:${dbConf.pass}@` : ''}${dbConf.host}:${dbConf.port}/${dbConf.db}`

mongoose.connect(dbAddr, {useMongoClient: true}).then(db => {
  logs.info('The database connection is successful.')
  MOD_CONFIG.findOne().then(doc => {
    if (doc) {
      logs.info('Server configuration load the success!')
      global.__config = doc
      require('./bin/server')
    } else {
      logs.error('Server configuration data loss!')
      process.exit(1)
    }
  }).catch(err => { throw err })
})

mongoose.connection.on('error', () => { throw new Error(`Unable to connect to database: ${dbAddr}`) })
