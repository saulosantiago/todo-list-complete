module.exports = class CreateProjectUseCase {
  constructor ({ createProjectRepository } = {}) {
    this.createProjectRepository = createProjectRepository
  }

  async create (name, userId) {
    return this.createProjectRepository.create(name, userId)
  }
}
