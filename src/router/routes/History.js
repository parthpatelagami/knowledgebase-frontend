import { lazy } from 'react'

const HistoryRoutes = [
  {
    path: '/history',
    exact: true,
    component: lazy(() => import('@src/views/history')),
    meta: {
      action: 'view',
      resource: 'History'
    }
  }
]

export default HistoryRoutes