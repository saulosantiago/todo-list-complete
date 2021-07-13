const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class CreateProjectRepository {
  async create (name, userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const result = await projectModel.insertOne({
      name: name,
      user_id: MongoHelper.getObjectId(userId),
      tasks: []
    })
    return result.ops[0]
  }
}
