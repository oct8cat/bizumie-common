const { Mongoose } = require('mongoose')
const { getEnvDbURI } = require('./env')

exports.createDb = () => {
  const db = new Mongoose()

  const createdAt = { type: 'Date', required: true, default: () => new Date() }

  const oauthSchema = new db.Schema({
    provider: { type: 'String', required: true },
    id: { type: 'String', required: true }
  })

  const userSchema = new db.Schema({
    displayName: { type: 'String', required: true },
    oauths: { type: [oauthSchema] }
  })

  const uploadSchema = new db.Schema({
    filename: { type: 'String', required: true },
    originalname: { type: 'String', required: true },
    user: { type: 'ObjectId' }
  })

  const postSchema = new db.Schema({
    title: { type: 'String', required: true },
    text: { type: 'String' },
    author: { type: 'ObjectId', ref: 'User' },
    createdAt
  })

  db.model('User', userSchema)
  db.model('Upload', uploadSchema)
  db.model('Post', postSchema)

  return db
}

exports.connectDb = (db, uri = getEnvDbURI()) => {
  return db.connect(uri).then(() => db)
}

exports.disconnectDb = (db) => {
  return db.disconnect().then(() => db)
}

const getModel = (exports.getModel = (name) => (db) => db.model(name))

exports.getUserModel = getModel('User')

exports.getUploadModel = getModel('Upload')

exports.getPostModel = getModel('Post')
