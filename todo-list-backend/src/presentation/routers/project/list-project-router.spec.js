const ListProjectRouter = require('./list-project-router')
const { ServerError } = require('../../errors')

const makeSut = () => {
  const listProjectUseCaseSpy = makeListProjectUseCase()
  const sut = new ListProjectRouter({
    listProjectUseCase: listProjectUseCaseSpy
  })
  return {
    sut,
    listProjectUseCaseSpy
  }
}

const makeListProjectUseCase = () => {
  class ListProjectUseCaseSpy {
    async list (userId) {
      this.userId = userId
      return [{ name: this.name, user_id: this.userId, tasks: [] }]
    }
  }
  const listProjectUseCaseSpy = new ListProjectUseCaseSpy()
  return listProjectUseCaseSpy
}

describe('List Project Router', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 500 if httpRequest has no user', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should call ListProjectUseCase with correct params', async () => {
    const { sut, listProjectUseCaseSpy } = makeSut()
    const httpRequest = {
      user: {
        id: 'any_id'
      }
    }
    await sut.route(httpRequest)
    expect(listProjectUseCaseSpy.userId).toBe(httpRequest.user.id)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut,listProjectUseCaseSpy } = makeSut()
    listProjectUseCaseSpy.name = 'any_name'
    const httpRequest = {
      user: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body[0].name).toBe('any_name')
  })
})
