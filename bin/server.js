import config from 'config'
import http from 'http'

import { i18n, logs } from './../lib'
import app from './app'

const conf = config.get('server')

const server = http.createServer(app)

const { server: log } = logs

function normalizePort (val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) return val
  if (port >= 0) return port

  return false
}

global.__sockets = {}

server.listen(normalizePort(conf.port), conf.host)
server.on('error', error => {
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
})
server.on('listening', () => {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  log.info('Server listening on ' + bind)
  log.info(i18n('Server listening on {{port}}', { port: bind }))
})
