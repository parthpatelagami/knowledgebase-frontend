import { lazy } from 'react'

const TaskRoutes = [
  {
    path: '/task',
    component: lazy(() => import('@src/views/task')),
    exact: true,
    meta: {
      action: 'view',
      resource: 'Task'
    }
  }
]

export default TaskRoutes