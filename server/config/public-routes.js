'use strict'

const Router = require('koa-router')

module.exports = function (app) {
  // public routes come before the JWT protected routes
  const router = new Router()
  
  router.get('/', async function (ctx) {
    ctx.body = 'Home!'
  })

  app.use(router.routes())
}
