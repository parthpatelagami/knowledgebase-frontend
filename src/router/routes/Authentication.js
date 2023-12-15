import { lazy } from 'react'

const AuthenticationRoutes = [
  {
    path: '/login',
    component: lazy(() => import('@src/views/authentication/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export default AuthenticationRoutes