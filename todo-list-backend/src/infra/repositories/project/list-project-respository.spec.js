const MongoHelper = require('../../helpers/mongo-helper')
const ListProjectRepository = require('./list-project-repository')
let projectModel

const makeSut = () => {
  return new ListProjectRepository()
}

describe('ListProject Repository', () => {
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

  test('Should return a list of projects if correct params are provided', async () => {
    const sut = makeSut()
    const userId = '60ea0e3d8e7c7100129b8e97'
    await projectModel.insertMany([{
      name: 'any_name',
      user_id: MongoHelper.getObjectId(userId),
      tasks: []
    },
    {
      name: 'any_name2',
      user_id: MongoHelper.getObjectId(userId),
      tasks: []
    }])
    const project = await sut.list('60ea0e3d8e7c7100129b8e97')
    expect(project[0]).toBeTruthy()
    expect(project[1]).toBeTruthy()
    expect(project[0].name).toBe('any_name')
    expect(String(project[0].user_id)).toBe('60ea0e3d8e7c7100129b8e97')
    expect(project[0].tasks).toBeTruthy()
  })
})
