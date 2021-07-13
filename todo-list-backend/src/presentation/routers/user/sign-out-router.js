const HttpResponse = require('../../helpers/http-response')

module.exports = class SignOutRouter {
  constructor ({ signOutUseCase } = {}) {
    this.signOutUseCase = signOutUseCase
  }

  async route (httpRequest) {
    try {
      const { id } = httpRequest.user
      const result = await this.signOutUseCase.signOut(id)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
