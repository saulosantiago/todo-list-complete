const request = require('supertest')
const app = require('../../../config/app')
const TokenGenerator = require('../../../../utils/helpers/token-generator')
const env = require('../../../config/env')
const MongoHelper = require('../../../../infra/helpers/mongo-helper')
let projectModel, accessToken, userId

const tokenGenerator = new TokenGenerator(env.tokenSecret)

describe('EditProject Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    projectModel = await MongoHelper.getCollection('projects')
    userModel = await MongoHelper.getCollection('users')
    const user = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'any_password'
    })
    userId = user.ops[0]._id
    accessToken = await tokenGenerator.generate(userId)
    await userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  })

  beforeEach(async () => {
    await projectModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid parameters are provided', async () => {
    const project = await projectModel.insertOne({
      name: 'any_name',
      user_id: userId
    })
    await request(app)
      .put(`/api/projects/${project.ops[0]._id}`)
      .send({
        name: 'updated_name'
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    await request(app)
      .post('/api/projects')
      .send()
      .set('Authorization', 'Bearer invalidToken')
      .expect(401)
  })
})
