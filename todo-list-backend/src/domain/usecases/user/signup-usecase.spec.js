const { MissingParamError } = require('../../../utils/errors')
const SignUpUseCase = require('./signup-usecase')

const makeEncrypter = () => {
  class EncrypterSpy {
    async hash (password) {
      this.password = password
      return this.hashedPassword
    }
  }
  const encrypterSpy = new EncrypterSpy()
  encrypterSpy.hashedPassword = 'hashed_password'
  return encrypterSpy
}

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'
  return tokenGeneratorSpy
}

const makeCreateUserRepository = () => {
  class CreateUserRepositorySpy {
    async create (name, email, password) {
      this.name = name
      this.email = email
      this.password = password
      return this.user
    }
  }
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  createUserRepositorySpy.user = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'hashed_password'
  }
  return createUserRepositorySpy
}

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeSut = () => {
  const encrypterSpy = makeEncrypter()
  const createUserRepositorySpy = makeCreateUserRepository()
  const tokenGeneratorSpy = makeTokenGenerator()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new SignUpUseCase({
    createUserRepository: createUserRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })
  return {
    sut,
    createUserRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('Auth UseCase', () => {
  test('Should call CreateUserRepository with correct parameters', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    await sut.signUp('any_name','any_email@mail.com', 'any_password')
    expect(createUserRepositorySpy.name).toBe('any_name')
    expect(createUserRepositorySpy.email).toBe('any_email@mail.com')
    expect(createUserRepositorySpy.password).toBe('hashed_password')
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy } = makeSut()
    await sut.signUp('any_name', 'valid_email@mail.com', 'any_password')
    expect(encrypterSpy.password).toBe('any_password')
  })

  test('Should call TokenGenerator with correct userId', async () => {
    const { sut, createUserRepositorySpy, tokenGeneratorSpy } = makeSut()
    await sut.signUp('valid_email@mail.com', 'valid_password')
    expect(tokenGeneratorSpy.userId).toBe(createUserRepositorySpy.user._id)
  })

  test('Should return an user and acessToken if correct parameters are provided', async () => {
    const { sut, tokenGeneratorSpy, createUserRepositorySpy } = makeSut()
    const result = await sut.signUp('valid_name', 'valid_email@mail.com', 'valid_password')
    expect(result.accessToken).toBe(tokenGeneratorSpy.accessToken)
    expect(result.user).toBe(createUserRepositorySpy.user)
    expect(result.accessToken).toBeTruthy()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, createUserRepositorySpy, updateAccessTokenRepositorySpy, tokenGeneratorSpy } = makeSut()
    await sut.signUp('valid_email@mail.com', 'valid_password')
    expect(updateAccessTokenRepositorySpy.userId).toBe(createUserRepositorySpy.user._id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.accessToken)
  })
})
