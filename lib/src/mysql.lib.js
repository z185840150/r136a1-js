import mysql from 'mysql'
import config from 'config'

const conf = config.get('mysql')

const pool = mysql.createPool({
  host: conf.host,
  port: conf.port,
  database: conf.datebase,
  user: conf.user,
  password: conf.password
})

export default {
  pool
}
