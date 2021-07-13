const { protectedAdapt } = require('../../../adapters/express-router-adapter')
const EditTaskRouterComposer = require('../../../composers/project/tasks/edit-task-router-composer')

module.exports = router => {
  router.put('/projects/:projectId/tasks/:taskId', protectedAdapt(EditTaskRouterComposer.compose()))
}
