const { adapt } = require('../../adapters/express-router-adapter')
const SignInRouterComposer = require('../../composers/user/signin-router-composer')

module.exports = router => {
  router.post('/signin', adapt(SignInRouterComposer.compose()))
}
