'use strict'

const Router   = require('koa-router')
const jwt      = require('koa-jwt')
const auth     = require('../endpoints/auth')
const user     = require('../endpoints/user')
const cart     = require('../endpoints/cart')
const products = require('../endpoints/products')


module.exports = function (app, config) {
  // custom 404 response for anything that isn't a protected resource
  app.use(async (ctx, next) => {
    if (ctx.url.match(/^\/api/)) {
      await next()
    } else {
      ctx.status = 404
      ctx.body = 'Not found\n'
    }
  })

  // custom 401 error page
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (401 === err.status) {
        ctx.status = 401
        ctx.body = 'Login required'
      } else {
        throw err
      }
    }
  })

  // public API routes
  const publicRoutes = new Router({ prefix: '/api' })
  publicRoutes.post('/login', auth.login)

  app.use(publicRoutes.routes())
  // extract JWT header token if available
  app.use(jwt({ secret: config.jwtSecret }))

  // protected API routes
  const protectedRoutes = new Router({ prefix: '/api' })
  protectedRoutes.get('/user',     user.user)
  protectedRoutes.get('/products', products.products)
  protectedRoutes.post('/totals',  cart.totals)

  app.use(protectedRoutes.routes())
}
