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
import EventForm from "../pages/EventForm";
import PartyForm from "../pages/PartyForm";
import StakeholderForm from "../pages/StakeholderForm";
// import { action as searchAction } from "../components/Search";

import { action as authAction } from "../pages/Authentication";
import { action as caseAction } from "../pages/CaseForm";
import { action as courtAction } from "../pages/CourtForm";
import { action as documentCreation } from "../pages/DocumentForm";
import { action as partyCreation } from "../pages/PartyForm";
import { action as stakeholderCreation } from "../pages/StakeholderForm";
import { action as eventCreation } from "../pages/EventForm";

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
            path: "document/:caseId",
            element: <DocumentForm />,
            action: documentCreation
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
            action: eventCreation
          },
          {
            path: "court",
            element: <CourtForm />,
            action: courtAction,
          },
          {
            path: "party",
            element: <PartyForm />,
            action: partyCreation
          },
          {
            path: "stakeholder",
            element: <StakeholderForm />,
            action: stakeholderCreation
          },
        ],
      },
    ],
  },
]);

export default router;
