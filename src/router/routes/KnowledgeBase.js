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
    },
    {
        path: '/knowledgebase/:category',
        component: lazy(()=> import('@src/views/knowledgebase/components/KnowledgeBasecategory')),
        exact: true
    },
    {
        path: '/knowledgebase/:category/:articles',
        component: lazy(()=> import('@src/views/knowledgebase/components/KnowledgeBaseSubcategory')),
        exact: true
    },
]

export default KnowledgeBaseRoutes

