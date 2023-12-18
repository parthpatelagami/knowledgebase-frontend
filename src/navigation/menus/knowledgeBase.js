// ** Icons Import
import { BookOpen } from 'react-feather'

export default [
    {
        id: 'knowledge-base',
        title: 'Knowledge Base',
        icon: <BookOpen size={20} />,
        navLink: '/knowledgebase',
        parentOf: ['/knowledgebase/category/questions', '/knowledgebase/category']
    }
]