import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout.jsx";
import Landing from "../pages/Landing.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import AuthForm from "../pages/AuthForm.jsx";
import DocumentForm from "../pages/DocumentForm.jsx";

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
        path: "auth/:page",
        element: <AuthForm />,
      },
      {
        path: "cases",
        element: <DocumentForm />,
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
