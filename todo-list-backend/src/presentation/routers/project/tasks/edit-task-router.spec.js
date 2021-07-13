const EditTaskRouter = require('./edit-task-router')
const { ServerError } = require('../../../errors')

const makeSut = () => {
  const editTaskUseCaseSpy = makeEditTaskUseCase()
  const sut = new EditTaskRouter({
    editTaskUseCase: editTaskUseCaseSpy
  })
  return {
    sut,
    editTaskUseCaseSpy
  }
}

const makeEditTaskUseCase = () => {
  class EditTaskUseCaseSpy {
    async edit (projectId, taskId, description, completed_at, userId) {
      this.projectId = projectId
      this.taskId = taskId
      this.description = description
      this.completed_at = completed_at
      this.userId = userId
      return { name: 'any_name', user_id: this.userId, tasks: [
          {
            description: this.description,
            created_at: new Date(Date.now() - 30*60000),
            completed_at: this.completed_at
          }
        ]
      }
    }
  }
  const editTaskUseCaseSpy = new EditTaskUseCaseSpy()
  return editTaskUseCaseSpy
}

describe('Edit Task Router', () => {
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

  test('Should call EditTaskUseCase with correct params', async () => {
    const { sut, editTaskUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description',
        completed_at: Date.now()
      },
      user: {
        id: 'any_id'
      },
      params: {
        projectId: 'project_id',
        taskId: 'task_id'
      }
    }
    await sut.route(httpRequest)
    expect(editTaskUseCaseSpy.description).toBe(httpRequest.body.description)
    expect(editTaskUseCaseSpy.completed_at).toBe(httpRequest.body.completed_at)
    expect(editTaskUseCaseSpy.userId).toBe(httpRequest.user.id)
    expect(editTaskUseCaseSpy.projectId).toBe(httpRequest.params.projectId)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description',
        completed_at: Date.now()
      },
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
    expect(httpResponse.body.tasks[0].description).toBe(httpRequest.body.description)
    expect(httpResponse.body.tasks[0].completed_at).toBe(httpRequest.body.completed_at)
  })
})
