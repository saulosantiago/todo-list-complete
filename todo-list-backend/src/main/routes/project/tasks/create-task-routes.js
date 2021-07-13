const { protectedAdapt } = require('../../../adapters/express-router-adapter')
const CreateTaskRouterComposer = require('../../../composers/project/tasks/create-task-router-composer')

module.exports = router => {
  router.post('/projects/:projectId/tasks', protectedAdapt(CreateTaskRouterComposer.compose()))
}
