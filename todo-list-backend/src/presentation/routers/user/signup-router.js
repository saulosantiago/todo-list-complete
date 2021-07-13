const HttpResponse = require('../../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../../utils/errors')

module.exports = class SignUpRouter {
  constructor ({ signUpUseCase, emailValidator } = {}) {
    this.signUpUseCase = signUpUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { name, email, password } = httpRequest.body
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const result = await this.signUpUseCase.signUp(name, email, password)
      return HttpResponse.ok(result)
    } catch (error) {
      if(error.name == 'EmailAlreadyExistsError'){
        return HttpResponse.conflictErrorRequest(error)
      }
      return HttpResponse.serverError()
    }
  }
}
