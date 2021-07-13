const CreateTaskRouter = require('../../../../presentation/routers/project/tasks/create-task-router')
const CreateTaskUseCase = require('../../../../domain/usecases/project/tasks/create-task-usecase')
const CreateTaskRepository = require('../../../../infra/repositories/project/tasks/create-task-repository')

module.exports = class CreateTaskRouterComposer {
  static compose () {
    const createTaskRepository = new CreateTaskRepository()
    const createTaskUseCase = new CreateTaskUseCase({
      createTaskRepository,
    })
    return new CreateTaskRouter({
      createTaskUseCase    
    })
  }
}
