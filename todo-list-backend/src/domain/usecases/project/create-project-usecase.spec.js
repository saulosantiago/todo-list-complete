const CreateProjectUseCase = require('./create-project-usecase')

const makeCreateProjectRepository = () => {
  class CreateProjectRepositorySpy {
    async create (name, userId) {
      this.name = name
      this.userId = userId
      return { name: this.name, user_id: this.userId, tasks: [] }
    }
  }
  return new CreateProjectRepositorySpy()
}

const makeSut = () => {
  const createProjectRepositorySpy = makeCreateProjectRepository()
  const sut = new CreateProjectUseCase({
    createProjectRepository: createProjectRepositorySpy
  })
  return {
    sut,
    createProjectRepositorySpy
  }
}

describe('Create Project UseCase', () => {
  test('Should call CreateProjectRepository with correct name and userId', async () => {
    const { sut, createProjectRepositorySpy } = makeSut()
    await sut.create('any_name', 'any_id')
    expect(createProjectRepositorySpy.name).toBe('any_name')
    expect(createProjectRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a project if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.create('valid_name', 'valid_id')
    expect(result.name).toBe('valid_name')
    expect(result.user_id).toBe('valid_id')
  })
})
