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
        path: '/knowledgebase/activetab/:category/:articleId/:categoryname',
        component: lazy(()=> import('@src/views/knowledgebase/components/KnowledgeBasecategory')),
        exact: true
    },
    {
        path: '/knowledgebase/:category/:articles/:categoryname',
        component: lazy(()=> import('@src/views/knowledgebase/components/KnowledgeBaseSubcategory')),
        exact: true
    },
    {
        path: '/knowledgebase/searcharticle/:searchcategoryid/:searcharticlesid/:categoryname',
        component: lazy(()=> import('@src/views/knowledgebase/components/knowledgebaseSerchArticle')),
        exact: true
    }
]

export default KnowledgeBaseRoutes

