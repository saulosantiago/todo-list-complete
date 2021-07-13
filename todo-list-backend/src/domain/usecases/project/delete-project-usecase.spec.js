const DeleteProjectUseCase = require('./delete-project-usecase')

const makeDeleteProjectRepository = () => {
  class DeleteProjectRepositorySpy {
    async delete (projectId, userId) {
      this.projectId = projectId
      this.userId = userId
      return true
    }
  }
  return new DeleteProjectRepositorySpy()
}

const makeSut = () => {
  const deleteProjectRepositorySpy = makeDeleteProjectRepository()
  const sut = new DeleteProjectUseCase({
    deleteProjectRepository: deleteProjectRepositorySpy
  })
  return {
    sut,
    deleteProjectRepositorySpy
  }
}

describe('Delete project UseCase', () => {
  test('Should call DeleteProjectRepository with correct params', async () => {
    const { sut, deleteProjectRepositorySpy } = makeSut()
    await sut.delete('project_id', 'any_id')
    expect(deleteProjectRepositorySpy.projectId).toBe('project_id')
    expect(deleteProjectRepositorySpy.userId).toBe('any_id')
  })

  test('Should return true if correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.delete('project_id', 'valid_id')
    expect(result).toBe(true)
  })
})
