const { createServer } = require('http')
const jwt = require('jsonwebtoken')
const { getJWTSecret, getPort } = require('./env')

exports.createServer = createServer

exports.startServer = (server, { port = getPort() } = {}) => {
  return new Promise((resolve, reject) => {
    server.on('error', reject).listen(port, () => {
      resolve(server)
    })
  })
}

exports.stopServer = (server) => {
  return new Promise((resolve, reject) => {
    server.close(() => resolve(server))
  })
}

exports.createUserJWT = (user, { secret = getJWTSecret() } = {}) =>
  jwt.sign(user.id, secret)
