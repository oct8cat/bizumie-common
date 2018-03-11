const { Mongoose } = require('mongoose')
const { getDbURI } = require('./env')

exports.createDb = () => {
  const db = new Mongoose()

  const oauthSchema = new db.Schema({
    provider: { type: 'String', required: true },
    id: { type: 'String', required: true }
  })

  const userSchema = new db.Schema({
    displayName: { type: 'String', required: true },
    oauths: { type: [oauthSchema] }
  })

  db.model('User', userSchema)

  return db
}

exports.connectDb = (db, uri = getDbURI()) => {
  return db.connect(uri).then(() => db)
}

exports.disconnectDb = (db) => {
  return db.disconnect().then(() => db)
}

const getModel = (exports.getModel = (name) => (db) => db.model(name))

exports.getUserModel = getModel('User')
