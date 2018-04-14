const { sign: signJWT_ } = require('jsonwebtoken')
const { getEnvJWTSecret } = require('./env')

const signJWT = (payload, secret = getEnvJWTSecret()) => {
  return signJWT_(payload, secret)
}

module.exports = {
  signJWT
}
