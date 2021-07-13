const HttpResponse = require('../../helpers/http-response')
const { MissingParamError } = require('../../../utils/errors')

module.exports = class EditProjectRouter {
  constructor ({ editProjectUseCase } = {}) {
    this.editProjectUseCase = editProjectUseCase
  }

  async route (httpRequest) {
    try {
      const projectId = httpRequest.params.id
      const { name } = httpRequest.body
      const userId = httpRequest.user.id
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      const result = await this.editProjectUseCase.edit(projectId, name, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
