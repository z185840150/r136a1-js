import config from 'config'
import http from 'http'

import { logs } from './../lib'
import app from './app'

const conf = config.get('server')

const server = http.createServer(app)

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
    case 'EACCES': logs.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE': logs.error(bind + ' is already in use')
      process.exit(1)
    default: throw error
  }
}

function onListening () {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  logs.info('Server listening on ' + bind)
}

global.__sockets = {}

server.listen(normalizePort(conf.port), conf.host)
server.on('error', onError)
server.on('listening', onListening)
