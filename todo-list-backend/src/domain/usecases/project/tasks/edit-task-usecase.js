module.exports = class EditTaskUseCase {
  constructor ({ editTaskRepository } = {}) {
    this.editTaskRepository = editTaskRepository
  }

  async edit (projectId, taskId, description, completed_at, userId) {
    return this.editTaskRepository.edit(projectId, taskId, description, completed_at, userId)
  }
}
