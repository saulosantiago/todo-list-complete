const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    const userModel = await MongoHelper.getCollection('users')
    const o_id = MongoHelper.getObjectId(userId)
    await userModel.updateOne({
      _id: o_id
    }, {
      $set: {
        accessToken
      }
    })
  }
}
