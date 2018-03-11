/* eslint-env mocha */

const assert = require('assert')
const {
  env,
  db: { getUserModel, disconnectDb, createDb, connectDb }
} = require('..')

describe('db', () => {
  let db
  beforeEach(() => connectDb((db = createDb())))
  afterEach(() => disconnectDb(db))

  it('createDb', () => {
    assert.equal(db.constructor.name, 'Mongoose')
  })
  it('disconnectDb', () => {
    assert.equal(db.connection.readyState, 1)
    return disconnectDb(db).then((db) => {
      assert.equal(db.connection.readyState, 0)
    })
  })
  it('connectDb', () => {
    const db = createDb()
    assert.equal(db.connection.readyState, 0)
    return connectDb(db)
      .then((db) => assert.equal(db.connection.readyState, 1))
      .then(() => disconnectDb(db))
  })
  it('getUserModel().create', () => {
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

describe('env', () => {
  it('getNodeEnv', () => {
    assert.equal(env.getNodeEnv(), 'test')
  })
  it('getDbURI', () => {
    assert.ok(env.getDbURI().match(/test/))
  })
})
