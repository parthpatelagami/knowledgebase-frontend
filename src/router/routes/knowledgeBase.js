import { lazy } from 'react'

const KnowledgeBaseRoutes = [
    {
        path: '/knowledge',
        exact: true,
        component: lazy(() => import('@src/views/pages/knowledge-base')),
        // meta: {
        //     action: 'view',
        //     resource: 'History'
        // }
    }
]

export default KnowledgeBaseRoutes