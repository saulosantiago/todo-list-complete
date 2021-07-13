module.exports = class DeleteTaskUseCase {
  constructor ({ deleteTaskRepository } = {}) {
    this.deleteTaskRepository = deleteTaskRepository
  }

  async delete (projectId, taskId, userId) {
    return this.deleteTaskRepository.delete(projectId, taskId, userId)
  }
}
