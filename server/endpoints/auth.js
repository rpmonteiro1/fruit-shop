'use strict'

const jwt              = require('jsonwebtoken')
const config           = require('../config/settings')
const validatePassword = require('../utils/user-utils').validatePassword
const createKey        = require('../utils/user-utils').createKey

exports.login = async function (ctx) {
  const user = await doLogin(ctx.db, ctx.request.body)
  const res  = {
    user,
    message: `Welcome ${user.profile.name}`
  }

  if (user) {
    ctx.status = 200
    ctx.body = res
  } else {
    ctx.status = 401
    ctx.response.message = 'Unauthorised'
  }
}


async function doLogin(db, params) {
  const user = await db.users.findOne({email: params.email})

  if (!user) {
    return
  }

  const profile = user
  const hash = profile.password_hash
  delete profile.password_hash

  return validatePassword(params.password || '', hash || '').then(valid => {
    if (valid) {
      const expires = Math.floor(Date.now() / 1000) + config.jwtExpiry * 60
      const token = jwt.sign(
        { id: profile.id, userKey: createKey(profile.created_at) },
        config.jwtSecret,
        { expiresIn: config.jwtExpiry }
      )
      return { token: token, expires: expires, profile: profile }
    }
  })
}
