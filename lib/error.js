const err = (exports.err = (message, props = {}) =>
  Object.assign(new Error(message), props))

exports.errRequired = (name) => err(`ERR_REQUIRED: ${name}`)
