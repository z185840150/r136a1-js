import config from 'config'
import redis from 'promise-redis'

const conf = config.get('REDIS')

const client = redis.createClient(conf.port, conf.host)

conf.auth && client.auth(conf.pass)

export default client
