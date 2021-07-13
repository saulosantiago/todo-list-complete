const HttpResponse = require('../../helpers/http-response')

module.exports = class ListProjectRouter {
  constructor ({ listProjectUseCase } = {}) {
    this.listProjectUseCase = listProjectUseCase
  }

  async route (httpRequest) {
    try {
      const userId = httpRequest.user.id
      const result = await this.listProjectUseCase.list(userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
