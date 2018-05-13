import config from 'config'
import http from 'http'

import app from './app'

import logger from './../lib/logger'

const server = http.createServer(app)
const serverConfig = config.get('SERVER')

function normalizePort (val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) return val
  if (port >= 0) return port

  return false
}

function onError (error) {
  if (error.syscall !== 'listen') throw error

  let bind = typeof port === 'string' ? `Pipe ${__config.server.port}` : `Port ${__config.server.port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': logger.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE': logger.error(bind + ' is already in use')
      process.exit(1)
    default: throw error
  }
}

function onListening () {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  logger.info('Server listening on ' + bind)
}

global.__sockets = {}

server.listen(normalizePort(serverConfig.port), serverConfig.host)
server.on('error', onError)
server.on('listening', onListening)

// require('./../server/modules/crawler/crawler.9188')
// require('./../server/modules/crawler/com.dszuqiu')
require('./../server/modules/proxy/cn.ip66')
