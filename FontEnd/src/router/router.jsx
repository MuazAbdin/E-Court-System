import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout.jsx";
import Landing from "../pages/Landing.jsx";
import CasesMangment from "../pages/CasesMangment.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
      // {
      //   path: "login",
      //   element: <Login />,
      // },

      {
        path: "Cases",
        element: <CasesMangment/>,
      },

      // {
      //   path: "dashboard",
      //   element: <DashboardLayout />,
      //   children: [],
      // },
    ],
  },
]);

export default router;
