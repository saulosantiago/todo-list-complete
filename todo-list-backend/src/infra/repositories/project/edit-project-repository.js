const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class EditProjectRepository {
  async edit (projectId, name, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const result = await projectModel.findOneAndUpdate(
      {
        _id: MongoHelper.getObjectId(projectId),
        user_id: MongoHelper.getObjectId(userId)
      },
      {
        $set: {
          name
        }
      },
      {
        returnOriginal: false
      }
    )
    return result.value
  }
}
