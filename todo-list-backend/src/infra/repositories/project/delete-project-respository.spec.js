const MongoHelper = require('../../helpers/mongo-helper')
const DeleteProjectRepository = require('./delete-project-repository')
let projectModel

const makeSut = () => {
  return new DeleteProjectRepository()
}

describe('DeleteProject Repository', () => {
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

  test('Should return an updated project if correct params are provided', async () => {
    const sut = makeSut()
    const userId = '60ea0e3d8e7c7100129b8e97'
    const project = await projectModel.insertOne({
      name: 'any_name',
      user_id: MongoHelper.getObjectId(userId),
      tasks: []
    })
    const deleteedProject = await sut.delete(project.ops[0]._id, '60ea0e3d8e7c7100129b8e97')
    expect(deleteedProject).toBeTruthy()
  })
})
