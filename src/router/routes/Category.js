import { lazy } from "react";

const CategoryRoutes = [
  {
    path: "/category",
    component: lazy(() => import("@src/views/category")),
    exact: true,
  },
];

export default CategoryRoutes;
