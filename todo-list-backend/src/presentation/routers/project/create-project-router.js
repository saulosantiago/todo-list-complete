const HttpResponse = require('../../helpers/http-response')
const { MissingParamError } = require('../../../utils/errors')

module.exports = class CreateProjectRouter {
  constructor ({ createProjectUseCase } = {}) {
    this.createProjectUseCase = createProjectUseCase
  }

  async route (httpRequest) {
    try {
      const { name } = httpRequest.body
      const userId = httpRequest.user.id
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'))
      }
      const result = await this.createProjectUseCase.create(name, userId)
      return HttpResponse.ok(result)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
