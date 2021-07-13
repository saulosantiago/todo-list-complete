const DeleteTaskRouter = require('./delete-task-router')
const { ServerError } = require('../../../errors')

const makeSut = () => {
  const deleteTaskUseCaseSpy = makeDeleteTaskUseCase()
  const sut = new DeleteTaskRouter({
    deleteTaskUseCase: deleteTaskUseCaseSpy
  })
  return {
    sut,
    deleteTaskUseCaseSpy
  }
}

const makeDeleteTaskUseCase = () => {
  class DeleteTaskUseCaseSpy {
    async delete (projectId, taskId, userId) {
      this.projectId = projectId
      this.taskId = taskId
      this.userId = userId
      return true
    }
  }
  const deleteTaskUseCaseSpy = new DeleteTaskUseCaseSpy()
  return deleteTaskUseCaseSpy
}

describe('Delete Task Router', () => {
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

  test('Should call DeleteTaskUseCase with correct params', async () => {
    const { sut, deleteTaskUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id',
        taskId: 'task_id'
      }
    }
    await sut.route(httpRequest)
    expect(deleteTaskUseCaseSpy.userId).toBe(httpRequest.user.id)
    expect(deleteTaskUseCaseSpy.projectId).toBe(httpRequest.params.projectId)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {},
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id',
        taskId: 'task_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse).toBeTruthy()
  })
})
