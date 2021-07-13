const MissingParamError = require('../../../utils/errors/missing-param-error')
const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class LoadUserByIdRepository {
  async load (id) {
    if (!id) {
      throw new MissingParamError('id')
    }
    const userModel = await MongoHelper.getCollection('users')
    const o_id = MongoHelper.getObjectId(id)
    const user = await userModel.findOne({
      "_id": o_id
    })
    return user
  }
}
