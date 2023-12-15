import { lazy } from 'react'

const DashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('@src/views/dashboard')),
    exact: true,
    meta: {
      action: 'view',
      resource: 'Dashboard'
    }
  }
]

export default DashboardRoutes 