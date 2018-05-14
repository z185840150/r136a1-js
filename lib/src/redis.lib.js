import Bluebird from 'bluebird'
import config from 'config'
import primoseRedis from 'promise-redis'

// 获取 redis 配置
const conf = config.get('REDIS')

// bluebird redis promise
// bluebird 在特定情况下速度优于原生 promise
const redis = primoseRedis(resolver => new Bluebird(resolver))

const password = conf.pass

const client = redis.createClient(
  conf.port,
  conf.host,
  Object.assign(conf.options, conf.auth ? { password } : {})
)

// conf.auth && client.auth(conf.pass)

export default client
