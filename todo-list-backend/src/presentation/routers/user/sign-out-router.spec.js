const SignOutRouter = require('./sign-out-router')
const { ServerError, UnauthorizedError } = require('../../errors')

const makeSut = () => {
  const signOutUseCaseSpy = makeSignOutUseCase()
  const sut = new SignOutRouter({
    signOutUseCase: signOutUseCaseSpy
  })
  return {
    sut,
    signOutUseCaseSpy
  }
}

const makeSignOutUseCase = () => {
  class SignOutUseCaseSpy {
    async signOut (id) {
      this.id = id
      return {}
    }
  }
  const signOutUseCaseSpy = new SignOutUseCaseSpy()
  signOutUseCaseSpy.user = {}
  signOutUseCaseSpy.accessToken = 'valid_token'
  return signOutUseCaseSpy
}

describe('SignOut Router', () => {
  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new ServerError().message)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut, signOutUseCaseSpy } = makeSut()
    const httpRequest = {
      user: {
        _id: "any_id"
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
