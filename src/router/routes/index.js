// ** Routes Imports
import AuthenticationRoutes from "./Authentication";
import DashboardRoutes from "./Dashboards";
import HistoryRoutes from "./History";
import TaskRoutes from "./Task";
import UsersRoutes from "./Users";
import TeamRoutes from "./Team";
import PermissionsRoutes from "./Permissions";
import MiscellaneousRoutes from "./Miscellaneous";
import ArticlesRoutes from "./Articles";
import CategoryRoutes from "./Category";
// import Category from './Category'
// import subCategory from './SubCategory'
// import KnowledgeBaseRoutes from './knowledgeBase'

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashboard/ecommerce";
// ** Merge Routes
const Routes = [
  ...MiscellaneousRoutes,
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...HistoryRoutes,
  ...TaskRoutes,
  ...UsersRoutes,
  ...TeamRoutes,
  ...PermissionsRoutes,
  ...ArticlesRoutes,
  ...CategoryRoutes,
  // ...subCategory,
  // ...KnowledgeBaseRoutes
];

export { DefaultRoute, TemplateTitle, Routes };
