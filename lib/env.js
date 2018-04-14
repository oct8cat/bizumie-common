const getEnvVar = (name, defaultValue) =>
  process.env[`BIZUMIE_${name}`] || process.env[name] || defaultValue

const getEnvNodeEnv = () => getEnvVar('NODE_ENV', 'development')

const getEnvPort = () => getEnvVar('PORT', 80)

const getEnvURL = () => getEnvVar('URL', `http://localhost:${getEnvPort()}`)

const getEnvDbURI = () =>
  getEnvVar('DB_URI', `mongodb://localhost/bizumie-${getEnvNodeEnv()}`)

const getEnvGoogleClientID = () =>
  getEnvVar(
    'GOOGLE_CLIENT_ID',
    '826917220236-bevqs3bs5d01gotfrodgh57q0te5hqno.apps.googleusercontent.com'
  )

const getEnvGoogleClientSecret = () =>
  getEnvVar('GOOGLE_CLIENT_SECRET', 'cZ7EurFGpNPzP3XuICSWZ_1v')

const getEnvGoogleCallbackURL = () =>
  getEnvVar('GOOGLE_CALLBACK_URL', `${getEnvURL()}/google/callback`)

const getEnvJWTSecret = () => getEnvVar('JWT_SECRET', 'secret')

module.exports = {
  getEnvDbURI,
  getEnvGoogleCallbackURL,
  getEnvGoogleClientID,
  getEnvGoogleClientSecret,
  getEnvJWTSecret,
  getEnvNodeEnv,
  getEnvPort,
  getEnvURL,
  getEnvVar
}
