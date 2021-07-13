const MongoHelper = require('../../../helpers/mongo-helper')
const CreateTaskRepository = require('./create-task-repository')
let projectModel

const makeSut = () => {
  return new CreateTaskRepository()
}

describe('CreateTask Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    projectModel = await MongoHelper.getCollection('projects')
  })

  beforeEach(async () => {
    await projectModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return a project if correct params are provided', async () => {
    const sut = makeSut()
    const userId = '60ea0e3d8e7c7100129b8e97'
    const project = await projectModel.insertOne({
      name: 'any_name',
      user_id: MongoHelper.getObjectId(userId),
      tasks: []
    })
    const result = await sut.create(project.ops[0]._id, 'valid_description', Date.now(), userId)
    expect(result._id).toBeTruthy()
    expect(result.tasks[0].description).toBe('valid_description')
  })
})
