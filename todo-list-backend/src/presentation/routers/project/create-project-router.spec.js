const CreateProjectRouter = require('./create-project-router')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')

const makeSut = () => {
  const createProjectUseCaseSpy = makeCreateProjectUseCase()
  const sut = new CreateProjectRouter({
    createProjectUseCase: createProjectUseCaseSpy
  })
  return {
    sut,
    createProjectUseCaseSpy
  }
}

const makeCreateProjectUseCase = () => {
  class CreateProjectUseCaseSpy {
    async create (name, userId) {
      this.name = name
      this.userId = userId
      return { name: this.name, user_id: this.userId, tasks: [] }
    }
  }
  const createProjectUseCaseSpy = new CreateProjectUseCaseSpy()
  return createProjectUseCaseSpy
}

describe('Create Project Router', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
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

  test('Should call CreateProjectUseCase with correct params', async () => {
    const { sut, createProjectUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      user: {
        id: 'any_id'
      }
    }
    await sut.route(httpRequest)
    expect(createProjectUseCaseSpy.name).toBe(httpRequest.body.name)
    expect(createProjectUseCaseSpy.userId).toBe(httpRequest.user.id)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      },
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.name).toBe(httpRequest.body.name)
  })
})
