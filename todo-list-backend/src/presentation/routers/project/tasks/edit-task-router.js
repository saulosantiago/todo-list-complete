const HttpResponse = require('../../../helpers/http-response')

module.exports = class EditTaskRouter {
  constructor ({ editTaskUseCase } = {}) {
    this.editTaskUseCase = editTaskUseCase
  }

  async route (httpRequest) {
    try {
      const { projectId, taskId } = httpRequest.params
      const { description, completed_at } = httpRequest.body
      const userId = httpRequest.user.id
      const result = await this.editTaskUseCase.edit(projectId, taskId, description, completed_at, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
