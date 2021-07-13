const CreateProjectRouter = require('../../../presentation/routers/project/create-project-router')
const CreateProjectUseCase = require('../../../domain/usecases/project/create-project-usecase')
const CreateProjectRepository = require('../../../infra/repositories/project/create-project-repository')

module.exports = class CreateProjectRouterComposer {
  static compose () {
    const createProjectRepository = new CreateProjectRepository()
    const createProjectUseCase = new CreateProjectUseCase({
      createProjectRepository,
    })
    return new CreateProjectRouter({
      createProjectUseCase    
    })
  }
}
