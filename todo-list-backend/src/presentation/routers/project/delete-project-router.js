const HttpResponse = require('../../helpers/http-response')

module.exports = class DeleteProjectRouter {
  constructor ({ deleteProjectUseCase } = {}) {
    this.deleteProjectUseCase = deleteProjectUseCase
  }

  async route (httpRequest) {
    try {
      const projectId = httpRequest.params.id
      const userId = httpRequest.user.id
      const result = await this.deleteProjectUseCase.delete(projectId, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
