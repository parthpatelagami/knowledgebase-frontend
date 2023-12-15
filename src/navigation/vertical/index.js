// ** Navigation imports
import dashboards from '../menus/dashboards'
import category from '../menus/category'
import knowledgeBase from '../menus/knowledgeBase'
import permissions from '../menus/permissions'
import users from '../menus/users'
import subCategory from '../menus/subCategory'
import articles from '../menus/articles'

// ** Merge & Export
export default [
    ...dashboards,
    ...users,
    ...category,
    ...knowledgeBase,
    // ...history,
    // ...task,
    // ...team,
    ...permissions,
    ...subCategory,
    ...articles
]