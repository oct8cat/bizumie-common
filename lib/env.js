const getNodeEnv = (exports.getNodeEnv = () =>
  process.env.NODE_ENV || 'development')

exports.getDbURI = () =>
  process.env.DB_URI || `mongodb://localhost/bizumie-${getNodeEnv()}`
