const EditProjectRouter = require('../../../presentation/routers/project/edit-project-router')
const EditProjectUseCase = require('../../../domain/usecases/project/edit-project-usecase')
const EditProjectRepository = require('../../../infra/repositories/project/edit-project-repository')

module.exports = class EditProjectRouterComposer {
  static compose () {
    const editProjectRepository = new EditProjectRepository()
    const editProjectUseCase = new EditProjectUseCase({
      editProjectRepository,
    })
    return new EditProjectRouter({
      editProjectUseCase    
    })
  }
}
