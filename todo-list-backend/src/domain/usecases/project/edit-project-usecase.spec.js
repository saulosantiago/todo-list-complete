const EditProjectUseCase = require('./edit-project-usecase')

const makeEditProjectRepository = () => {
  class EditProjectRepositorySpy {
    async edit (projectId, name, userId) {
      this.projectId = projectId
      this.name = name
      this.userId = userId
      return { name: this.name, user_id: this.userId, tasks: [] }
    }
  }
  return new EditProjectRepositorySpy()
}

const makeSut = () => {
  const editProjectRepositorySpy = makeEditProjectRepository()
  const sut = new EditProjectUseCase({
    editProjectRepository: editProjectRepositorySpy
  })
  return {
    sut,
    editProjectRepositorySpy
  }
}

describe('Edit project UseCase', () => {
  test('Should call EditProjectRepository with correct params', async () => {
    const { sut, editProjectRepositorySpy } = makeSut()
    await sut.edit('project_id', 'any_name', 'any_id')
    expect(editProjectRepositorySpy.projectId).toBe('project_id')
    expect(editProjectRepositorySpy.name).toBe('any_name')
    expect(editProjectRepositorySpy.userId).toBe('any_id')
  })

  test('Should return a project if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.edit('project_id', 'valid_name', 'valid_id')
    expect(result.name).toBe('valid_name')
    expect(result.user_id).toBe('valid_id')
  })
})
