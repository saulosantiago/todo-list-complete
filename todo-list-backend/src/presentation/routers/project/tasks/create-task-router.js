const HttpResponse = require('../../../helpers/http-response')
const { MissingParamError } = require('../../../../utils/errors')

module.exports = class CreateTaskRouter {
  constructor ({ createTaskUseCase } = {}) {
    this.createTaskUseCase = createTaskUseCase
  }

  async route (httpRequest) {
    try {
      const { projectId } = httpRequest.params
      const { description } = httpRequest.body
      const userId = httpRequest.user.id
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError('description'))
      }
      const result = await this.createTaskUseCase.create(projectId, description, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
