// ** Navigation imports
import dashboards from '../menus/dashboards'
import history from '../menus/history'
import task from '../menus/task'
import users from '../menus/users'
import team from '../menus/team'
import permissions from '../menus/permissions'

// ** Merge & Export
export default [
    ...dashboards,
    ...history,
    ...task,
    ...users,
    ...team,
    ...permissions
]
