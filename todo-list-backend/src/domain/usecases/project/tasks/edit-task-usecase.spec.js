const EditTaskUseCase = require('./edit-task-usecase')

const makeEditTaskRepository = () => {
  class EditTaskRepositorySpy {
    async edit (projectId, taskId, description, completed_at, userId) {
      this.projectId = projectId
      this.taskId = taskId
      this.description = description
      this.completed_at = completed_at
      this.userId = userId
      return { name: 'any_name', user_id: this.userId, tasks: [
          {
            description: this.description,
            created_at: new Date(Date.now() - 30*60000),
            completed_at: completed_at
          }
        ]
      }
    }
  }
  return new EditTaskRepositorySpy()
}

const makeSut = () => {
  const editTaskRepositorySpy = makeEditTaskRepository()
  const sut = new EditTaskUseCase({
    editTaskRepository: editTaskRepositorySpy
  })
  return {
    sut,
    editTaskRepositorySpy
  }
}

describe('Edit Task UseCase', () => {
  test('Should call EditTaskRepository with correct name and userId', async () => {
    const { sut, editTaskRepositorySpy } = makeSut()
    const currentDate = Date.now()
    await sut.edit('project_id', 'task_id', 'any_description', currentDate, 'any_id')
    expect(editTaskRepositorySpy.projectId).toBe('project_id')
    expect(editTaskRepositorySpy.taskId).toBe('task_id')
    expect(editTaskRepositorySpy.description).toBe('any_description')
    expect(editTaskRepositorySpy.completed_at).toBe(currentDate)
    expect(editTaskRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a task if correct params are provided', async () => {
    const { sut } = makeSut()
    const currentDate = Date.now()
    const result = await sut.edit('project_id', 'task_id', 'any_description', currentDate, 'any_id')
    expect(result.tasks[0].description).toBe('any_description')
    expect(result.tasks[0].completed_at).toBe(currentDate)
  })
})
