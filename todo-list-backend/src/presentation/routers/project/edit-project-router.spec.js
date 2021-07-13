const EditProjectRouter = require('./edit-project-router')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')

const makeSut = () => {
  const editProjectUseCaseSpy = makeEditProjectUseCase()
  const sut = new EditProjectRouter({
    editProjectUseCase: editProjectUseCaseSpy
  })
  return {
    sut,
    editProjectUseCaseSpy
  }
}

const makeEditProjectUseCase = () => {
  class EditProjectUseCaseSpy {
    async edit (projectId, name, userId) {
      this.projectId = projectId
      this.name = name
      this.userId = userId
      return { name: this.name, user_id: this.userId, tasks: [] }
    }
  }
  const editProjectUseCaseSpy = new EditProjectUseCaseSpy()
  return editProjectUseCaseSpy
}

describe('Edit Project Router', () => {
  test('Should return 400 if no name is provided', async () => {
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
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call EditProjectUseCase with correct params', async () => {
    const { sut, editProjectUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      user: {
        id: 'any_id'
      },
      params: {
        id: 'any_project_id'
      }
    }
    await sut.route(httpRequest)
    expect(editProjectUseCaseSpy.projectId).toBe(httpRequest.params.id)
    expect(editProjectUseCaseSpy.name).toBe(httpRequest.body.name)
    expect(editProjectUseCaseSpy.userId).toBe(httpRequest.user.id)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      user: {
        id: 'any_id'
      },
      params: {
        id: 'any_project_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.name).toBe(httpRequest.body.name)
  })
})
