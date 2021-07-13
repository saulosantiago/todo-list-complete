const HttpResponse = require('../../../helpers/http-response')

module.exports = class DeleteTaskRouter {
  constructor ({ deleteTaskUseCase } = {}) {
    this.deleteTaskUseCase = deleteTaskUseCase
  }

  async route (httpRequest) {
    try {
      const { projectId, taskId } = httpRequest.params
      const userId = httpRequest.user.id
      const result = await this.deleteTaskUseCase.delete(projectId, taskId, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
