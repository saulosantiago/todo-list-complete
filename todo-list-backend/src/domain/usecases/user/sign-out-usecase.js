module.exports = class SignOutUseCase {
  constructor ({ updateAccessTokenRepository } = {}) {
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async signOut (id) {
    return this.updateAccessTokenRepository.update(id, null)
  }
}
