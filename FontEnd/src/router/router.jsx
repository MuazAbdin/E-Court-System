import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Overview,
  DocumentForm,
  Authentication,
} from "../pages";

import Search from "../components/Search";
import CaseForm from "../pages/CaseForm";
import CourtForm from "../pages/CourtForm";

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
        element: <Authentication />,
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
            path: "document",
            element: <DocumentForm />,
          },
          {
            path: "case",
            element: <CaseForm />,
          },
          {
            path: "browse",
            element: <Search />,
          },
          {
            path: "court",
            element: <CourtForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
