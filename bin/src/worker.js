import cluster from 'cluster'
import { i18n, logs, Server } from '../../lib'

const { worker: log } = logs

if (cluster.isWorker) {
  log.info(i18n('Worker {{pid}} started', { pid: process.pid }))
  cluster.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  })
} else {
  log.error(i18n('The worker {{pid}} thread is in the wrong environment', { pid: process.pid }))
  process.exit(0)
}

// const server = new Server()

// server.listen()