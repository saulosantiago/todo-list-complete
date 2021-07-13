const { protectedAdapt } = require('../../adapters/express-router-adapter')
const CreateProjectRouterComposer = require('../../composers/project/create-project-router-composer')

module.exports = router => {
  router.post('/projects', protectedAdapt(CreateProjectRouterComposer.compose()))
}
