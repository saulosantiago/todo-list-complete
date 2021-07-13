const CreateTaskUseCase = require('./create-task-usecase')

const makeCreateTaskRepository = () => {
  class CreateTaskRepositorySpy {
    async create (projectId, description, created_at, userId) {
      this.projectId = projectId
      this.description = description
      this.created_at = created_at
      this.userId = userId
      return { name: this.name, user_id: this.userId, tasks: [
        {
          description: this.description,
          created_at: this.created_at,
          completed_at: null
        }
      ] }
    }
  }
  return new CreateTaskRepositorySpy()
}

const makeSut = () => {
  const createTaskRepositorySpy = makeCreateTaskRepository()
  const sut = new CreateTaskUseCase({
    createTaskRepository: createTaskRepositorySpy
  })
  return {
    sut,
    createTaskRepositorySpy
  }
}

describe('Create Task UseCase', () => {
  test('Should call CreateTaskRepository with correct name and userId', async () => {
    const { sut, createTaskRepositorySpy } = makeSut()
    await sut.create('project_id', 'any_description', 'any_id')
    expect(createTaskRepositorySpy.projectId).toBe('project_id')
    expect(createTaskRepositorySpy.description).toBe('any_description')
    expect(createTaskRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a task if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.create('project_id', 'any_description', 'any_id')
    expect(result.tasks[0].description).toBe('any_description')
  })
})
