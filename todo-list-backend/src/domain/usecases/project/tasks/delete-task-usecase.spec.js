const DeleteTaskUseCase = require('./delete-task-usecase')

const makeDeleteTaskRepository = () => {
  class DeleteTaskRepositorySpy {
    async delete (projectId, taskId, userId) {
      this.projectId = projectId
      this.taskId = taskId
      this.userId = userId
      return true
    }
  }
  return new DeleteTaskRepositorySpy()
}

const makeSut = () => {
  const deleteTaskRepositorySpy = makeDeleteTaskRepository()
  const sut = new DeleteTaskUseCase({
    deleteTaskRepository: deleteTaskRepositorySpy
  })
  return {
    sut,
    deleteTaskRepositorySpy
  }
}

describe('Delete Task UseCase', () => {
  test('Should call DeleteTaskRepository with correct name and userId', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut()
    await sut.delete('project_id', 'task_id', 'any_id')
    expect(deleteTaskRepositorySpy.projectId).toBe('project_id')
    expect(deleteTaskRepositorySpy.taskId).toBe('task_id')
    expect(deleteTaskRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a task if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('project_id', 'task_id', 'any_id')
    expect(result).toBeTruthy()
  })
})
