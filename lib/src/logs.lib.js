import config from 'config'
import log4js from 'log4js'

const conf = config.get('log')

log4js.configure(conf)

const logs = log4js.getLogger('[server]')

export default logs
