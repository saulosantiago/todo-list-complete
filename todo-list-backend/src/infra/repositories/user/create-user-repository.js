const { EmailAlreadyExistsError } = require('../../../utils/errors')
const MongoHelper = require('../../helpers/mongo-helper')

module.exports = class CreateUserRepository {
  async create (name, email, password) {
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.findOne({
      email
    })
    if(user){
      throw new EmailAlreadyExistsError(email)
    }
    const result = await userModel.insertOne({
      name,
      email,
      password
    })
    return result.ops[0]
  }
}
