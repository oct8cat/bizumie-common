const getNodeEnv = (exports.getNodeEnv = () =>
  process.env.NODE_ENV || 'development')

const getURL = (exports.getURL = () =>
  process.env.URL || `http://localhost:${getPort()}`)

const getPort = (exports.getPort = () => process.env.PORT || 3000)

exports.getDbURI = () =>
  process.env.DB_URI || `mongodb://localhost/bizumie-${getNodeEnv()}`

exports.getGoogleClientID = () =>
  process.env.GOOGLE_CLIENT_ID ||
  '826917220236-bevqs3bs5d01gotfrodgh57q0te5hqno.apps.googleusercontent.com'

exports.getGoogleClientSecret = () =>
  process.env.GOOGLE_CLIENT_SECRET || 'cZ7EurFGpNPzP3XuICSWZ_1v'

exports.getGoogleCallbackURL = () =>
  process.env.GOOGLE_CALLBACK_URL || `${getURL()}/google/callback`

exports.getJWTSecret = () => process.env.JWT_SECRET || 'JWT_SECRET'
