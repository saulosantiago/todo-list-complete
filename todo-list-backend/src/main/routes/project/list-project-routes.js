const { protectedAdapt } = require('../../adapters/express-router-adapter')
const ListProjectRouterComposer = require('../../composers/project/list-project-router-composer')

module.exports = router => {
  router.get('/projects', protectedAdapt(ListProjectRouterComposer.compose()))
}
