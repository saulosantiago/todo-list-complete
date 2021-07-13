const DeleteTaskRouter = require('../../../../presentation/routers/project/tasks/delete-task-router')
const DeleteTaskUseCase = require('../../../../domain/usecases/project/tasks/delete-task-usecase')
const DeleteTaskRepository = require('../../../../infra/repositories/project/tasks/delete-task-repository')

module.exports = class DeleteTaskRouterComposer {
  static compose () {
    const deleteTaskRepository = new DeleteTaskRepository()
    const deleteTaskUseCase = new DeleteTaskUseCase({
      deleteTaskRepository,
    })
    return new DeleteTaskRouter({
      deleteTaskUseCase    
    })
  }
}
