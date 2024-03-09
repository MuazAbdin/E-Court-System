import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Overview,
  AuthForm,
  DocumentForm,
} from "../pages";
import Search from "../components/Search";
import CaseForm from "../pages/CaseForm";
import CourtForm from "../pages/CourtForm";
import EventForm from "../pages/EventForm";
import PartyForm from "../pages/PartyForm";
import StakeholderForm from "../pages/StakeholderForm";

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
            path: "event",
            element: <EventForm />,
          },
          {
            path: "court",
            element: <CourtForm />,
          },
          {
            path: "party",
            element: <PartyForm />,
          },
          {
            path: "stakeholder",
            element: <StakeholderForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
