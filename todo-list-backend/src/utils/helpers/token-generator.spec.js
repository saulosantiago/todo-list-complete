jest.mock('jsonwebtoken', () => ({
  token: 'any_token',

  sign (payload, secret) {
    this.payload = payload
    this.secret = secret
    return this.token
  },

  verify (token, secret) {
    this.token = token
    this.secret = secret
    return this.result
  }
}))

const jwt = require('jsonwebtoken')
const TokenGenerator = require('./token-generator')
const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('Token Generator - sign', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.payload).toEqual({
      _id: 'any_id'
    })
    expect(jwt.secret).toBe(sut.secret)
  })
})

describe('Token Generator - verify', () => {
  test('Should return throw if JWT throws', async () => {
    const sut = makeSut()
    sut.verify = async () => {
      throw new Error()
    }
    const result = sut.verify('any_token')
    expect(result).rejects.toThrow()
  })

  test('Should return an Id if JWT recognizes token', async () => {
    const sut = makeSut()
    jwt.result = { _id: 'any_id' }
    const result = await sut.verify('any_token')
    expect(result._id).toBe('any_id')
  })

  test('Should call JWT with correct values', async () => {
    const sut = makeSut()
    await sut.verify('any_token')
    expect(jwt.token).toEqual('any_token')
    expect(jwt.secret).toBe(sut.secret)
  })
})
