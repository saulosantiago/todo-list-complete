const HttpResponse = require('../../helpers/http-response')
const { MissingParamError } = require('../../../utils/errors')

module.exports = class SignInRouter {
  constructor ({ signInUseCase } = {}) {
    this.signInUseCase = signInUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const result = await this.signInUseCase.signIn(email, password)
      return HttpResponse.ok(result)
    } catch (error) {
      if(error.name == "UnauthorizedError"){
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.serverError()
    }
  }
}
