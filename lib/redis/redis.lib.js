import config from 'config'
import redis from 'promise-redis'

const redisConf = config.get('REDIS')

const client = redis.createClient(redisConf.port, redisConf.host)

redisConf.auth && client.auth(redisConf.pass)

export default client
