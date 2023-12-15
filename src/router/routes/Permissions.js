import { lazy } from 'react'

const PermissionsRoutes = [
  {
    path: '/permissions/role',
    component: lazy(() => import('@src/views/permission/role-table')),
    meta: {
      action: 'view',
      resource: 'Permissions'
    }
  }
]

export default PermissionsRoutes