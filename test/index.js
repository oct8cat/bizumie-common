/* eslint-env mocha */

const assert = require('assert')
const { length } = require('ramda')
const {
  db: { disconnectDb, createDb, connectDb, getUserModel, getUploadModel },
  http: { createServer, startServer, stopServer },
  user: { createUserToken }
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
  it('getUserModel, getUploadModel', () => {
    const db = createDb()
    assert.ok(getUserModel(db))
    assert.ok(getUploadModel(db))
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
})

describe('user', () => {
  it('createUserToken', () => {
    assert.equal(length(createUserToken({ id: 'test' })), 71)
  })
})
