const SignOutUseCase = require('./sign-out-usecase')

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
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new SignOutUseCase({
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })
  return {
    sut,
    updateAccessTokenRepositorySpy
  }
}

describe('SignOut UseCase', () => {
  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    await sut.signOut('any_id')
    expect(updateAccessTokenRepositorySpy.userId).toBe('any_id')
    expect(updateAccessTokenRepositorySpy.accessToken).toBeNull()
  })
})
