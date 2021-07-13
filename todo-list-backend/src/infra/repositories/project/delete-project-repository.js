const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class DeleteProjectRepository {
  async delete (projectId, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const result = await projectModel.deleteOne(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId)
      }
    )
    return result.deletedCount === 1
  }
}
