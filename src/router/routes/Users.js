import { lazy } from 'react'

const UsersRoutes = [
  {
    path: '/users',
    component: lazy(() => import('@src/views/users')),
    exact: true,
    meta: {
      action: 'view',
      resource: 'Users'
    }
  }
]

export default UsersRoutes