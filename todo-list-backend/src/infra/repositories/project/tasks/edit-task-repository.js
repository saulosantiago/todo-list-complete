const MongoHelper = require('../../../helpers/mongo-helper')

module.exports = class EditTaskRepository {
  async edit (projectId, taskId, description, completed_at, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const paramToUpdate = (description)? {
        "tasks.$.description": description
      } : {
        "tasks.$.completed_at": completed_at
      }
    await projectModel.updateOne(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId),
        "tasks._id": MongoHelper.getObjectId(taskId)
      },
      {
        $set: paramToUpdate
      }
    )
    return projectModel.findOne(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId)
      }
    )
  }
}
