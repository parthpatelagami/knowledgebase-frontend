import { lazy } from 'react'

const KnowledgeBaseRoutes = [
    {
        path: '/knowledgebase',
        exact: true,
        component: lazy(() => import('@src/views/knowledgebase')),
        // meta: {
        //     action: 'view',
        //     resource: 'History'
        // }
    }
]

export default KnowledgeBaseRoutes