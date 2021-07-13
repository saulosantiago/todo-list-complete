const { protectedAdapt } = require('../../adapters/express-router-adapter')
const SignOutRouterComposer = require('../../composers/user/sign-out-router-composer')

module.exports = router => {
  router.post('/sign-out', protectedAdapt(SignOutRouterComposer.compose()))
}
