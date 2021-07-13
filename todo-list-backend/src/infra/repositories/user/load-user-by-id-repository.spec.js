const MongoHelper = require('../../helpers/mongo-helper')
const LoadUserByIdRepository = require('./load-user-by-id-repository')
const MissingParamError = require('../../../utils/errors/missing-param-error')
let userModel

const makeSut = () => {
  return new LoadUserByIdRepository()
}

describe('LoadUserByEmail Repository', () => {
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

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('60ea0e3d8e7c7100123b8e97')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      password: 'hashed_password'
    })
    const userId = fakeUser.ops[0]._id
    const user = await sut.load(userId)
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      email: 'valid_email@mail.com',
      name: 'any_name',
      password: 'hashed_password'
    })
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
