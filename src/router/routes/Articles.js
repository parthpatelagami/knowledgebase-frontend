import { lazy } from 'react'

const ArticlesRoutes = [
  {
    path: '/articles',
    component: lazy(() => import('@src/views/articles')),
    exact: true,
    meta: {
      authRoute: true
    }
  }
]

export default ArticlesRoutes