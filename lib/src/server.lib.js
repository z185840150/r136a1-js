import bodyParser from 'body-parser'
import compress from 'compression'
import connectTimeout from 'connect-timeout'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Enum } from 'enumify'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import methodOverride from 'method-override'
import path from 'path'

class ServerFlag extends Enum {}

ServerFlag.initEnum(['MASTER', 'ADMIN', 'WEB', 'REST'])

/**
 * 服务器
 *
 * @class Server
 * @extends {http.Server}
 */
export default class Server extends http.Server {
  /**
   * @readonly
   * @type {ServerFlag}
   */
  static FLAG = ServerFlag

  get flag () { return this._flag }
  get app () { return this._app }

  /**
   * Creates an instance of Server.
   * @param {ServerFlag} flag
   * @memberof Server
   */
  constructor (flag) {
    super()
    if (flag instanceof ServerFlag) {
      this._flag = flag
      this._app = express()
      this.init()
    } else {
      throw new Error('服务器标志类型错误') && process.exit(1)
    }
  }

  init () {
    this.initExpress()
  }

  initExpress () {
    this._app.use(connectTimeout('5s'))

    this._app.use(bodyParser.json({limit: '512kb'})) // application/json
    this._app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
    this._app.use(cookieParser())
    this._app.use(compress())
    this._app.use(methodOverride())
    // view engine setup
    this._app.set('views', path.join(__dirname, 'server/views'))
    this._app.set('view engine', 'pug')
    this._app.use(express.static(path.join(__dirname, 'server/public')))
    // secure apps by setting various HTTP headers
    this._app.use(helmet())
    // enable CORS - Cross Origin Resource Sharing
    this._app.use(cors())
    this._app.all('*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token, Cross-Origin')
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
      res.header('X-Powered-By', 'R136A1 JS')
      next()
    })
  }

  /**
   * 开启监听
   *
   * @memberof Server
   */
  listen () {

  }

  /**
   * 格式化端口
   *
   * @param {string|number} val 端口
   * @returns
   * @memberof Server
   */
  normalizePort (val) {
    const port = parseInt(val, 10)
    return isNaN(port) ? val : port >= 0 ? port : false
  }
}
