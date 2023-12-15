import { lazy } from 'react'

const SubCategoryRoutes = [
    {
        path: '/subcategory',
        exact: true,
        component: lazy(() => import('@src/views/subategory')),
        // meta: {
        //     action: 'view',
        //     resource: 'History'
        // }
    }
]

export default SubCategoryRoutes