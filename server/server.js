'use strict'

const Koa          = require('koa')
const app          = module.exports = new Koa()
const responseTime = require('koa-response-time')
const logger       = require('koa-morgan')
const helmet       = require('koa-helmet')
const errorHandler = require('koa-error')
const bodyparser   = require('koa-bodyparser')
// const serve        = require('koa-static')
const cors         = require('kcors')
const compress     = require('koa-compress')
const enforceHttps = require('koa-sslify')
const config       = require('./config/settings')
const routes       = require('./config/routes')
const database     = require('./config/database')
const serve        = require('koa-static-server')

const env          = process.env.NODE_ENV
const port         = process.env.PORT || 8080
const maxage       = env === 'production' ? 24 * 60 * 60 * 1000 : 0


database.then(db => app.context.db = db)
app.use(responseTime())
app.use(cors())
app.use(bodyparser())

if (config.env !== 'test') {
  app.use(logger('combined'))
}

if (config.env === 'production') {
  app.use(enforceHttps({ trustProtoHeader: true }))
}

app.use(helmet())
app.use(errorHandler())
app.use(compress())

process.on('unhandledRejection', reason => {
  console.log('Unhandled promise rejection: ' + reason)
})

// publicRoutes(app)
// app.use(serve('../client/build', { maxage, defer: false }))
app.use(serve({rootDir: '../client/build'}))
routes(app, config)

app.listen(port)
console.log(`Server listening on port: ${port} in ${config.env} mode`)
