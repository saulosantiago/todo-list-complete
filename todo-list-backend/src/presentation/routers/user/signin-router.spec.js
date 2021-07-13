const SignInRouter = require('./signin-router')
const { MissingParamError } = require('../../../utils/errors')
const { ServerError, UnauthorizedError } = require('../../errors')

const makeSut = () => {
  const signInUseCaseSpy = makeSignInUseCase()
  const sut = new SignInRouter({
    signInUseCase: signInUseCaseSpy
  })
  return {
    sut,
    signInUseCaseSpy
  }
}

const makeSignInUseCase = () => {
  class SignInUseCaseSpy {
    async signIn (email, password) {
      this.email = email
      this.password = password
      return { user: this.user, accessToken: this.accessToken }
    }
  }
  const signInUseCaseSpy = new SignInUseCaseSpy()
  signInUseCaseSpy.user = {}
  signInUseCaseSpy.accessToken = 'valid_token'
  return signInUseCaseSpy
}

describe('SignIn Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('email').message)
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('password').message)
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

  test('Should call SignInUseCase with correct params', async () => {
    const { sut, signInUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(signInUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(signInUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut, signInUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toBe(signInUseCaseSpy.accessToken)
  })

  test('Should return 401 if an invalid credential is provided', async () => {
    const { sut, signInUseCaseSpy } = makeSut()
    signInUseCaseSpy.signIn = async () => {
      throw new UnauthorizedError()
    }
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body.error).toBe(new UnauthorizedError().message)
  })
})
