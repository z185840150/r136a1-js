import cluster from 'cluster'

if (cluster.isMaster) require('./src/master')
else require('./src/worker')
