import { i18n, logs } from '../../lib'

const { worker: log } = logs

log.info(i18n('Worker {{pid}} started', { pid: process.pid }))
