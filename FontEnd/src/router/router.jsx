import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Overview,
  AuthForm,
  DocumentForm,
} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "auth/:page",
        element: <AuthForm />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "cases",
            element: <DocumentForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
