const { protectedAdapt } = require('../../adapters/express-router-adapter')
const EditProjectRouterComposer = require('../../composers/project/edit-project-router-composer')

module.exports = router => {
  router.put('/projects/:id', protectedAdapt(EditProjectRouterComposer.compose()))
}
