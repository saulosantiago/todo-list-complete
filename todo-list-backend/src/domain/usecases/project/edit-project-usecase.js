module.exports = class EditProjectUseCase {
  constructor ({ editProjectRepository } = {}) {
    this.editProjectRepository = editProjectRepository
  }

  async edit (projectId, name, userId) {
    return this.editProjectRepository.edit(projectId, name, userId)
  }
}
