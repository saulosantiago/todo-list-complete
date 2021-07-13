const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class ListProjectRepository {
  async list (userId) {
    const projectModel = await MongoHelper.getCollection('projects')
    const result = await projectModel.find({
      user_id: MongoHelper.getObjectId(userId),
    })
    const projects = []
    await result.forEach((project) => projects.push(project))
    return projects
  }
}
