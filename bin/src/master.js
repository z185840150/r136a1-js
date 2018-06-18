import cluster from 'cluster'
import { cpus } from 'os'

import { i18n, logs } from '../../lib'

const { master: log } = logs

log.info(i18n('Muster {{pid}} is running', { pid: process.pid }))
console.log(cluster.workers)
// fork workers.
for (let i = 0; i < cpus().length; i++) {
  const worker = cluster.fork()
  const pid = worker.process.pid

  worker.on('exit', (code, signal) => {
    if (signal) log.warn(i18n('Worker {{pid}} was killed by signal: {{signal}}', { signal, pid }))
    else if (code !== 0) log.error(i18n('Worker {{pid}} exited with error code: {{code}}', { code, pid }))
    else log.info(i18n('Worker {{pid}} success', { pid }))
  })
}

// bind cluster exit event.
cluster.on('exit', (worker, code, signal) => {
  log.warn(i18n('Worker {{pid}} died', { pid: worker.process.pid }))
})
