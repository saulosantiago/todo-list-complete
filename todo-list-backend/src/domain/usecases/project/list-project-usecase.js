module.exports = class ListProjectUseCase {
  constructor ({ listProjectRepository } = {}) {
    this.listProjectRepository = listProjectRepository
  }

  async list (userId) {
    return this.listProjectRepository.list(userId)
  }
}
