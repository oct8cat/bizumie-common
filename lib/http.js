const { createServer } = require('http')
const { getEnvPort } = require('./env')

const startServer = (server, { port = getEnvPort() } = {}) => {
  return new Promise((resolve, reject) => {
    server.on('error', reject).listen(port, () => {
      resolve(server)
    })
  })
}

const stopServer = (server) => {
  return new Promise((resolve, reject) => {
    server.close(() => resolve(server))
  })
}

module.exports = {
  createServer,
  startServer,
  stopServer
}
