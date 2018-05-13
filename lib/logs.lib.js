import config from 'config'
import log4js from 'log4js'

const conf = config.get('LOG')

log4js.configure(conf)

export default log4js.getLogger('[server]')
