const CreateTaskRouter = require('./create-task-router')
const { MissingParamError } = require('../../../../utils/errors')
const { ServerError } = require('../../../errors')

const makeSut = () => {
  const createTaskUseCaseSpy = makeCreateTaskUseCase()
  const sut = new CreateTaskRouter({
    createTaskUseCase: createTaskUseCaseSpy
  })
  return {
    sut,
    createTaskUseCaseSpy
  }
}

const makeCreateTaskUseCase = () => {
  class CreateTaskUseCaseSpy {
    async create (projectId, description, userId) {
      this.projectId = projectId
      this.description = description
      this.userId = userId
      return { name: 'any_name', user_id: this.userId, tasks: [
        {
          description: this.description,
          created_at: Date.now(),
          completed_at: null
        }
      ] }
    }
  }
  const createTaskUseCaseSpy = new CreateTaskUseCaseSpy()
  return createTaskUseCaseSpy
}

describe('Create Task Router', () => {
  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('description').message)
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

  test('Should call CreateTaskUseCase with correct params', async () => {
    const { sut, createTaskUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description'
      },
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id'
      }
    }
    await sut.route(httpRequest)
    expect(createTaskUseCaseSpy.description).toBe(httpRequest.body.description)
    expect(createTaskUseCaseSpy.userId).toBe(httpRequest.user.id)
    expect(createTaskUseCaseSpy.projectId).toBe(httpRequest.params.projectId)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description'
      },
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.tasks[0].description).toBe(httpRequest.body.description)
  })
})
