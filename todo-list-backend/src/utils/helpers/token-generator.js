const jwt = require('jsonwebtoken')

module.exports = class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    return jwt.sign({ _id: id }, this.secret)
  }

  async verify (token) {
    return jwt.verify(token, this.secret)
  }
}
