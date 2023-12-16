// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import auth from "./authentication";
import dashboard from "@src/views/dashboard/store";
import permissions from "@src/views/permission/role-table/store";
import users from "@src/views/users/store";
import team from "@src/views/team/store";
import task from "@src/views/task/store";
import category from "@src/views/category/store";

const rootReducer = {
  auth,
  navbar,
  layout,
  dashboard,
  users,
  team,
  permissions,
  task,
  category,
};

export default rootReducer;
