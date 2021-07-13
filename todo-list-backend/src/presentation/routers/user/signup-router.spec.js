const SignUpRouter = require('./signup-router')
const { MissingParamError, InvalidParamError, EmailAlreadyExistsError } = require('../../../utils/errors')
const { ServerError } = require('../../errors')

const makeSut = () => {
  const signUpUseCaseSpy = makeSignUpUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new SignUpRouter({
    signUpUseCase: signUpUseCaseSpy,
    emailValidator: emailValidatorSpy
  })
  return {
    sut,
    signUpUseCaseSpy,
    emailValidatorSpy
  }
}

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid (email) {
      this.email = email
      return this.isEmailValid
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy()
  emailValidatorSpy.isEmailValid = true
  return emailValidatorSpy
}

const makeSignUpUseCase = () => {
  class SignUpUseCaseSpy {
    async signUp (name, email, password) {
      this.name = name
      this.email = email
      this.password = password
      return { user: this.user, accessToken: this.accessToken }
    }
  }
  const signUpUseCaseSpy = new SignUpUseCaseSpy()
  signUpUseCaseSpy.user = {}
  signUpUseCaseSpy.accessToken = 'valid_token'
  return signUpUseCaseSpy
}

describe('SignUp Router', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })

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

  test('Should call SignUpUseCase with correct params', async () => {
    const { sut, signUpUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(signUpUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(signUpUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const { sut, signUpUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.accessToken).toBe(signUpUseCaseSpy.accessToken)
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new InvalidParamError('email').message)
  })

  test('Should return 409 if an existing email is provided', async () => {
    const { sut, signUpUseCaseSpy } = makeSut()
    const existingEmail = 'used_email@mail.com'
    signUpUseCaseSpy.signUp = async () => {
      throw new EmailAlreadyExistsError(existingEmail)
    }
    const httpRequest = {
      body: {
        name: 'any_name',
        email: existingEmail,
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(409)
    expect(httpResponse.body.error).toBe(new EmailAlreadyExistsError(existingEmail).message)
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.route(httpRequest)
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email)
  })
})
