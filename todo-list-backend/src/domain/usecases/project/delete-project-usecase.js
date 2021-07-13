module.exports = class DeleteProjectUseCase {
  constructor ({ deleteProjectRepository } = {}) {
    this.deleteProjectRepository = deleteProjectRepository
  }

  async delete (projectId, userId) {
    return this.deleteProjectRepository.delete(projectId, userId)
  }
}
