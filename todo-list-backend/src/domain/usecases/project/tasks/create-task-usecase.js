module.exports = class CreateTaskUseCase {
  constructor ({ createTaskRepository } = {}) {
    this.createTaskRepository = createTaskRepository
  }

  async create (projectId, description, userId) {
    const created_at = Date.now()
    return this.createTaskRepository.create(projectId, description, created_at, userId)
  }
}
