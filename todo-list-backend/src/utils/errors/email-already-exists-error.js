module.exports = class EmailAlreadyExistsError extends Error {
  constructor (emailName) {
    super(`The email "${emailName}" is already used`)
    this.name = 'EmailAlreadyExistsError'
  }
}
