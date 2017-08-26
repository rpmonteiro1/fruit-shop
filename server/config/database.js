'use strict'

const massive = require('massive')
const config  = require('../config/settings')
const url     = require('url')
const params  = url.parse(config.pg.database)
const auth    = params.auth ? params.auth.split(':') : ''


module.exports = massive({
  user:     auth[0],
  password: auth[1],
  host:     params.hostname,
  port:     params.port,
  database: params.pathname.split('/')[1] || config.pg.database
})
