const MissingParamError = require('./missing-param-error')
const InvalidParamError = require('./invalid-param-error')
const EmailAlreadyExistsError = require('./email-already-exists-error')
const UnauthorizedError = require('./unauthorized-error')

module.exports = {
  MissingParamError,
  InvalidParamError,
  EmailAlreadyExistsError,
  UnauthorizedError
}
