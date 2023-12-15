import { lazy } from 'react'

const TeamRoutes = [
  {
    path: '/team',
    exact: true,
    component: lazy(() => import('@src/views/team')),
    meta: {
      action: 'view',
      resource: 'Team'
    }
  }
]

export default TeamRoutes