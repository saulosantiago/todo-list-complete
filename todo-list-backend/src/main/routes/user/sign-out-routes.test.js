const request = require('supertest')
const app = require('../../config/app')
const TokenGenerator = require('../../../utils/helpers/token-generator')
const env = require('../../config/env')
const MongoHelper = require('../../../infra/helpers/mongo-helper')
let userModel

const tokenGenerator = new TokenGenerator(env.tokenSecret)

describe('Sign out Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid token is provided', async () => {
    const user = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'any_password'
    })
    const userId = user.ops[0]._id
    const accessToken = await tokenGenerator.generate(userId)
    await userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
    await request(app)
      .post('/api/sign-out')
      .send()
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    await request(app)
      .post('/api/sign-out')
      .send()
      .set('Authorization', 'Bearer invalidToken')
      .expect(401)
  })
})
