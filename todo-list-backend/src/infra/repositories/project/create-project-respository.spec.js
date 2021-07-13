const MongoHelper = require('../../helpers/mongo-helper')
const CreateProjectRepository = require('./create-project-repository')
let projectModel

const makeSut = () => {
  return new CreateProjectRepository()
}

describe('CreateProject Repository', () => {
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
    const project = await sut.create('valid_name', '60ea0e3d8e7c7100129b8e97')
    expect(project._id).toBeTruthy()
    expect(project.name).toBe('valid_name')
    expect(String(project.user_id)).toBe('60ea0e3d8e7c7100129b8e97')
    expect(project.tasks).toBeTruthy()
  })
})
