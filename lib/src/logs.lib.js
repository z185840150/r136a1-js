import config from 'config'
import log4js from 'log4js'

const conf = config.get('log')

log4js.configure(conf)

const server = log4js.getLogger('[server]')
const master = log4js.getLogger('[master]')
const worker = log4js.getLogger('[worker]')

const custom = identification => log4js.getLogger(`[${identification}]`)

export default {
  master,
  worker,
  server,
  custom
}
