// ** Routes Imports
import AuthenticationRoutes from './Authentication'
import DashboardRoutes from './Dashboards'
import HistoryRoutes from './History'
import TaskRoutes from "./Task"
import UsersRoutes from './Users'
import TeamRoutes from './Team'
import PermissionsRoutes from './Permissions'
import MiscellaneousRoutes from './Miscellaneous'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce'
// ** Merge Routes
const Routes = [
  ...MiscellaneousRoutes,
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...HistoryRoutes,
  ...TaskRoutes,
  ...UsersRoutes,
  ...TeamRoutes,
  ...PermissionsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }