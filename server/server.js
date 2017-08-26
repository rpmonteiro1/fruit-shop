'use strict'

const Koa          = require('koa')
const app          = new Koa()
const responseTime = require('koa-response-time')
const logger       = require('koa-morgan')
const helmet       = require('koa-helmet')
const errorHandler = require('koa-error')
const bodyparser   = require('koa-bodyparser')
const cors         = require('kcors')
const compress     = require('koa-compress')
const enforceHttps = require('koa-sslify')
const config       = require('./config/settings')
const routes       = require('./config/routes')
const database     = require('./config/database')


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

app.use(serve(__dirname + '../client/build', { maxage, defer: false }))
routes(app, config)
app.listen(config.app.port)
console.log(`Server listening on port: ${config.app.port} in ${config.env} mode`)
