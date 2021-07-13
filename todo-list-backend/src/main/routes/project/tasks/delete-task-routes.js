const { protectedAdapt } = require('../../../adapters/express-router-adapter')
const DeleteTaskRouterComposer = require('../../../composers/project/tasks/delete-task-router-composer')

module.exports = router => {
  router.delete('/projects/:projectId/tasks/:taskId', protectedAdapt(DeleteTaskRouterComposer.compose()))
}
