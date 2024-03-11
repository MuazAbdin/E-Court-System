import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Overview,
  DocumentForm,
  Authentication,
  EditUserDetails,
  ChangeUserPassword,
} from "../pages";

import Search from "../components/Search";
import CaseForm from "../pages/CaseForm";
import CourtForm from "../pages/CourtForm";
import EventForm from "../pages/EventForm";
import PartyForm from "../pages/PartyForm";
import StakeholderForm from "../pages/StakeholderForm";
// import { action as searchAction } from "../components/Search";

import { action as authAction } from "../pages/Authentication";
import { action as caseAction } from "../pages/CaseForm";
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
        action: authAction,
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
            path: "edit-details",
            element: <EditUserDetails />,
          },
          {
            path: "change-password",
            element: <ChangeUserPassword />,
          },
          {
            path: "document/:caseId",
            element: <DocumentForm />,
          },
          {
            path: "case",
            element: <CaseForm />,
            action: caseAction,
          },
          {
            path: "browse",
            element: <Search />,
          },
          {
            path: "event/:caseId",
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
