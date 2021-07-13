const DeleteProjectRouter = require('./delete-project-router')
const { ServerError } = require('../../errors')

const makeSut = () => {
  const deleteProjectUseCaseSpy = makeDeleteProjectUseCase()
  const sut = new DeleteProjectRouter({
    deleteProjectUseCase: deleteProjectUseCaseSpy
  })
  return {
    sut,
    deleteProjectUseCaseSpy
  }
}

const makeDeleteProjectUseCase = () => {
  class DeleteProjectUseCaseSpy {
    async delete (projectId, userId) {
      this.projectId = projectId
      this.userId = userId
      return true
    }
  }
  const deleteProjectUseCaseSpy = new DeleteProjectUseCaseSpy()
  return deleteProjectUseCaseSpy
}

describe('Delete Project Router', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has nothing', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call DeleteProjectUseCase with correct params', async () => {
    const { sut, deleteProjectUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      },
      params: {
        id: 'any_project_id'
      }
    }
    await sut.route(httpRequest)
    expect(deleteProjectUseCaseSpy.projectId).toBe(httpRequest.params.id)
    expect(deleteProjectUseCaseSpy.userId).toBe(httpRequest.user.id)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      },
      params: {
        id: 'any_project_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
