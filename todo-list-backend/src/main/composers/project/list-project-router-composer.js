const ListProjectRouter = require('../../../presentation/routers/project/list-project-router')
const ListProjectUseCase = require('../../../domain/usecases/project/list-project-usecase')
const ListProjectRepository = require('../../../infra/repositories/project/list-project-repository')

module.exports = class ListProjectRouterComposer {
  static compose () {
    const listProjectRepository = new ListProjectRepository()
    const listProjectUseCase = new ListProjectUseCase({
      listProjectRepository,
    })
    return new ListProjectRouter({
      listProjectUseCase    
    })
  }
}
