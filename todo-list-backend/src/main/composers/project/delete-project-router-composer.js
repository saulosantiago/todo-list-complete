const DeleteProjectRouter = require('../../../presentation/routers/project/delete-project-router')
const DeleteProjectUseCase = require('../../../domain/usecases/project/delete-project-usecase')
const DeleteProjectRepository = require('../../../infra/repositories/project/delete-project-repository')

module.exports = class DeleteProjectRouterComposer {
  static compose () {
    const deleteProjectRepository = new DeleteProjectRepository()
    const deleteProjectUseCase = new DeleteProjectUseCase({
      deleteProjectRepository,
    })
    return new DeleteProjectRouter({
      deleteProjectUseCase    
    })
  }
}
