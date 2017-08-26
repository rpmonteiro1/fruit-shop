'use strict'

require('dotenv').config({ silent: true })
const env      = process.env.NODE_ENV || 'development'
const dbConfig = require('../database.json')

const config = {
  env,
  pg: {
    database: process.env.DATABASE_URL || dbConfig.dev.database
  },
  app: {
    port: process.env.PORT || 9010
  },
  jwtSecret: process.env.JWT_SECRET || 'Uh.. this is a fruit shop!',
  jwtExpiry: 60 * 60 * 24 * 7 // 7 days expiry defined in seconds
}


module.exports = config
