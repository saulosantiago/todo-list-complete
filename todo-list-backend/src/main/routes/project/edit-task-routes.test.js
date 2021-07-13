const request = require('supertest')
const app = require('../../config/app')
const TokenGenerator = require('../../../utils/helpers/token-generator')
const env = require('../../config/env')
const MongoHelper = require('../../../infra/helpers/mongo-helper')
let projectModel, accessToken, userId

const tokenGenerator = new TokenGenerator(env.tokenSecret)

describe('CreateTask Routes', () => {
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
      user_id: MongoHelper.getObjectId(userId),
      tasks: [
        {
          _id: MongoHelper.getObjectId(),
          description: 'old_description',
          created_at: new Date(Date.now() - 30*60000),
          completed_at: null
        }
      ]
    })
    const projectId = project.ops[0]._id
    const taskId = project.ops[0].tasks[0]._id

    const response = await request(app)
      .put(`/api/projects/${projectId}/tasks/${taskId}`)
      .send({
        description: 'new_description'
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
    expect(response.body.tasks[0].description).toBe('new_description')
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    await request(app)
      .post('/api/projects')
      .send()
      .set('Authorization', 'Bearer invalidToken')
      .expect(401)
  })
})
