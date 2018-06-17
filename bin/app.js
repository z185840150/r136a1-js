import bodyParser from 'body-parser'
import compress from 'compression'
import connectTimeout from 'connect-timeout'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createBundleRenderer } from 'vue-server-renderer'
import express from 'express'
import ExpressRateLimit from 'express-rate-limit'
import ExpressValidation from 'express-validation'
import helmet from 'helmet'
import httpStatus from 'http-status'
import LRU from 'lru-cache'
import methodOverride from 'method-override'
import path from 'path'
import RedisStore from 'rate-limit-redis'

import logs from './../lib/logs/logs.lib'
import redis from './../lib/redis/redis.lib'

import routes from '../server/routes/index.route'

import APIError from '../server/helpers/APIError'

const app = express()

app.use(connectTimeout('5s'))

app.use(bodyParser.json({limit: '512kb'})) // application/json
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())
// view engine setup
app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'server/public')))
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token, Cross-Origin')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', 'Flower LOTTERY DC API 1.0')
  next()
})
__config.server.safe.rate.enable && app.use(new ExpressRateLimit({
  store: new RedisStore({client: redis}),
  windowMs: __config.server.safe.rate.windowMs,
  delayAfter: __config.server.safe.rate.delayAfter,
  delayMs: __config.server.safe.rate.delayMs,
  max: __config.server.safe.rate.max,
  message: '429',
  onLimitReached: (req, res, options) => {
    logs.warn(`IP为 ${req.ip} 的客户端短期内大量次数访问 ${req.route.path} 接口`)
  }
}))

// mount all routes on /api path
app.use('/api', routes)

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof ExpressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
    const error = new APIError(unifiedErrorMessage, err.status, true)
    return next(error)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND)
  return next(err)
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// SSR
const resolve = file => path.resolve(__dirname, file)

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({ max: 1000, maxAge: 1000 * 60 * 15 }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./public'),
    // recommended for performance
    runInNewContext: false
  }))
}

export default app
