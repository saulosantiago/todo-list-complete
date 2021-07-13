const { protectedAdapt } = require('../../adapters/express-router-adapter')
const DeleteProjectRouterComposer = require('../../composers/project/delete-project-router-composer')

module.exports = router => {
  router.delete('/projects/:id', protectedAdapt(DeleteProjectRouterComposer.compose()))
}
