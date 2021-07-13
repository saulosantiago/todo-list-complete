const MongoHelper = require('../../helpers/mongo-helper')
const CreateUserRepository = require('./create-user-repository')
const { EmailAlreadyExistsError } = require('../../../utils/errors')
let userModel

const makeSut = () => {
  return new CreateUserRepository()
}

describe('CreateUser Repository', () => {
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

  test('Should return an user if correct params are provided', async () => {
    const sut = makeSut()
    const user = await sut.create('valid_name', 'valid_email@mail.com', 'hashed_password')
    expect(user._id).toBeTruthy()
    expect(user.name).toBe('valid_name')
    expect(user.email).toBe('valid_email@mail.com')
    expect(user.password).toBe('hashed_password')
  })

  test('Should throw an error if user is found with the email', async () => {
    const sut = makeSut()
    const usedEmail = 'used_email@mail.com'
    const fakeUser = await userModel.insertOne({
      email: usedEmail,
      name: 'any_name',
      password: 'hashed_password'
    })
    const promise = sut.create('any_name', usedEmail, 'hashed_password')
    await expect(promise).rejects.toThrow(new EmailAlreadyExistsError(usedEmail))
  })
})
