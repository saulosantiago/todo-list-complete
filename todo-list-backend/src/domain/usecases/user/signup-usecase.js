module.exports = class SignUpUseCase {
  constructor ({ createUserRepository, updateAccessTokenRepository, encrypter, tokenGenerator } = {}) {
    this.createUserRepository = createUserRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async signUp (name, email, password) {
    const hashedPassword = await this.encrypter.hash(password)
    const user = await this.createUserRepository.create(name, email, hashedPassword)
    const accessToken = await this.tokenGenerator.generate(user._id)
    await this.updateAccessTokenRepository.update(user._id, accessToken)
    delete user.password
    return { user, accessToken }
  }
}
