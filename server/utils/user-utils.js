'use strict'

const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const config = require('../config/settings')

const encryptPassword = function (password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (err1, salt) {
      if (err1) {
        return reject(err1)
      }

      bcrypt.hash(password, salt, function (err2, hash) {
        if (err2) {
          return reject(err2)
        }
        return resolve(hash)
      })
    })
  })
}


const validatePassword = function (password, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (err, state) {
      if (err) {
        return reject(err)
      }
      return resolve(state)
    })
  })
}


const validatePasswordFormat = function (password) {
  const str = `${password}`.trim()

  if (!str) {
    return 'password required'
  } else if (str.length < 6) {
    return 'password must be at least 6 characters long'
  } else {
    // no errors
    return ''
  }
}


const createKey = function (timestamp, num = 0) {
  return ((timestamp ? new Date(timestamp).getTime() : Date.now()) + num).toString(36)
}


const createJWT = function (profile) {
  return jwt.sign(
    {id: profile.id},
    config.jwtSecret,
    {expiresIn: config.jwtExpiry}
  )
}

module.exports = {
  encryptPassword,
  validatePassword,
  validatePasswordFormat,
  createKey,
  createJWT
}
