const { signJWT } = require('./jwt')

const createUserToken = (user) => {
  return signJWT(user.id)
}

module.exports = {
  createUserToken
}
