/* eslint-env mocha */

const assert = require('assert')
const {
  env: { getNodeEnv, getJWTSecret, getDbURI, getPublicDir },
  db: { getUserModel, disconnectDb, createDb, connectDb },
  http: { createServer, startServer, stopServer, createUserJWT }
} = require('..')

describe('db', () => {
  it('createDb', () => {
    assert.equal(createDb().constructor.name, 'Mongoose')
  })
  it('connectDb, disconnectDb', () => {
    const db = createDb()
    assert.equal(db.connection.readyState, 0)
    return connectDb(db)
      .then((db) => assert.equal(db.connection.readyState, 1))
      .then(() => disconnectDb(db))
      .then(() => assert.equal(db.connection.readyState, 0))
  })
  describe('With `db` created and connected', () => {
    let db
    beforeEach(() => connectDb((db = createDb())))
    afterEach(() => disconnectDb(db))

    it('getUserModel(db).create', () => {
      const displayName = 'test'
      const oauth = { provider: 'test', id: 'test' }
      const userModel = getUserModel(db)
      return userModel
        .remove({ displayName })
        .then(() => userModel.create({ displayName, oauths: [oauth] }))
        .then((user) => {
          assert.equal(user.displayName, displayName)
          assert.equal(user.oauths.length, 1)
          assert.equal(user.oauths[0].provider, oauth.provider)
          assert.equal(user.oauths[0].id, oauth.id)
        })
    })
  })
})

describe('env', () => {
  it('getNodeEnv', () => {
    assert.equal(getNodeEnv(), 'test')
  })
  it('getDbURI', () => {
    assert.ok(getDbURI().match(/bizumie-test/))
  })
  it('getJWTSecret', () => {
    assert.equal(typeof getJWTSecret(), 'string')
  })
})

describe('http', () => {
  it('createServer', () => {
    assert.ok(createServer)
  })
  it('startServer', () => {
    const server = createServer()
    return startServer(server).then(() => stopServer(server))
  })
  it('createUserJWT', () => {
    const user = { id: 'test' }
    const token = createUserJWT(user)
    assert.ok(token)
  })
})
