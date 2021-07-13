const TokenGenerator = require('../../utils/helpers/token-generator')
const LoadUserByIdRepository = require('../../infra/repositories/user/load-user-by-id-repository')
const { UnauthorizedError } = require('../../presentation/errors')
const env = require('../config/env')

module.exports = class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }

  static protectedAdapt (router) {
    return async (req, res) => {
      const tokenGenerator = new TokenGenerator(env.tokenSecret)
      const loadUserByIdRepository = new LoadUserByIdRepository()
      try {
        const token = req.headers['authorization']?.split(' ')[1]
        if(token) {
          const result = await tokenGenerator.verify(token)
          const user = await loadUserByIdRepository.load(result._id)
          if(user.accessToken === token){
            const httpRequest = {
              body: req.body,
              user: {
                id: result._id
              },
              params: req.params
            }
            const httpResponse = await router.route(httpRequest)
            return res.status(httpResponse.statusCode).json(httpResponse.body)
          }
        }
        throw new UnauthorizedError()
      } catch(e) {
        res.status(401).json(JSON.stringify(e))
      }
    }
  }
}
