const request = require('supertest')
const app = require('../../config/app')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../../infra/helpers/mongo-helper')
let userModel

describe('SignUp Routes', () => {
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

  test('Should return 200 when valid parameters are provided', async () => {
    const payload = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await request(app)
      .post('/api/signup')
      .send(payload)
      .expect(200)
  })

  test('Should return 409 when existing email is provided', async () => {
    await userModel.insertOne({
      name: 'valid_name',
      email: 'used_email@mail.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })
    const payload = {
      name: 'valid_name',
      email: 'used_email@mail.com',
      password: 'valid_password'
    }

    await request(app)
      .post('/api/signup')
      .send(payload)
      .expect(409)
  })
})
