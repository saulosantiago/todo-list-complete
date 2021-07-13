const SignInRouter = require('../../../presentation/routers/user/signin-router')
const SignInUseCase = require('../../../domain/usecases/user/signin-usecase')
const LoadUserByEmailRepository = require('../../../infra/repositories/user/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../../infra/repositories/user/update-access-token-repository')
const Encrypter = require('../../../utils/helpers/encrypter')
const TokenGenerator = require('../../../utils/helpers/token-generator')
const env = require('../../config/env')

module.exports = class SignInRouterComposer {
  static compose () {
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const encrypter = new Encrypter(env.encryption_salt_rounds)
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const signInUseCase = new SignInUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    return new SignInRouter({
      signInUseCase    
    })
  }
}
