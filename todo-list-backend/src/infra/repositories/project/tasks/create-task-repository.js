const MongoHelper = require('../../../helpers/mongo-helper')

module.exports = class CreateTaskRepository {
  async create (projectId, description, created_at, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const result = await projectModel.findOneAndUpdate(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId)
      },
      {
        $push: {
          tasks: {
            _id: MongoHelper.getObjectId(),
            description,
            created_at,
            completed_at: null
          }
        }
      },
      {
        returnOriginal: false
      }
    )
    return result.value
  }
}
