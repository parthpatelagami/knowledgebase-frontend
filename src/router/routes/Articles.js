import { lazy } from "react";

const ArticlesRoutes = [
  {
    path: "/articles",
    component: lazy(() => import("@src/views/articles")),
    exact: true,
  },
];

export default ArticlesRoutes;
