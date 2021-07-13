const ListProjectUseCase = require('./list-project-usecase')

const makeListProjectRepository = () => {
  class ListProjectRepositorySpy {
    async list (userId) {
      this.userId = userId
      return [{ name: 'any_name', user_id: this.userId, tasks: [] }]
    }
  }
  return new ListProjectRepositorySpy()
}

const makeSut = () => {
  const listProjectRepositorySpy = makeListProjectRepository()
  const sut = new ListProjectUseCase({
    listProjectRepository: listProjectRepositorySpy
  })
  return {
    sut,
    listProjectRepositorySpy
  }
}

describe('List project UseCase', () => {
  test('Should call ListProjectRepository with correct name and userId', async () => {
    const { sut, listProjectRepositorySpy } = makeSut()
    await sut.list('any_id')
    expect(listProjectRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a list of projects if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.list('valid_id')
    expect(result[0].name).toBe('any_name')
    expect(result[0].user_id).toBe('valid_id')
  })
})
