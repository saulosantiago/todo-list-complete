const MongoHelper = require('../../../helpers/mongo-helper')

module.exports = class DeleteTaskRepository {
  async delete (projectId, taskId, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const project = await projectModel.findOneAndUpdate(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId)
      },
      {
        $pull: {
          tasks: {
            _id: MongoHelper.getObjectId(taskId)
          }
        }
      }
    )
    return project.ok === 1
  }
}
