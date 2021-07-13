jest.mock('bcrypt', () => ({
  isValid: true,

  async hash (value, salt) {
    this.value = value
    this.salt = salt
    return this.hashedValue
  },

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')
const Encrypter = require('./encrypter')

const makeSut = () => {
  const salt = 10
  const encrypter = new Encrypter(salt)
  bcrypt.hashedValue = 'hashed_value'
  return encrypter
}

describe('Encrypter hash', () => {
  test('Should return hash if bcrypt returns hash', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.hash('any_value')
    expect(bcrypt.value).toBe('any_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.hash()).rejects.toThrow(new MissingParamError('value'))
  })
})

describe('Encrypter compare', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })
})

