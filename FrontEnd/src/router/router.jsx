import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Authentication,
  CaseCatalog,
  UserLayout,
  EditUserDetails,
  ChangeUserPassword,
  Overview,
  Cases,
  BrowseCourts,
  AddNewCourt,
  Courts,
  MyCases,
  Claim,
  Respond,
  AddDocument,
  CaseDetails,
  AddStakeholder,
  AddEvent,
} from "../pages";

import { loader as userLayoutLoader } from "../pages/UserLayout";

import { action as authAction } from "../pages/Authentication";
// import { action as courtAction } from "../pages/CourtForm";
// import { action as partyCreation } from "../pages/PartyForm";
// import { action as stakeholderCreation } from "../pages/StakeholderForm";
// import { action as eventCreation } from "../pages/EventForm";

import { action as editUserDetailsAction } from "../pages/userProfile/EditUserDetails";
import { action as changePasswordAction } from "../pages/userProfile/ChangeUserPassword";

import { loader as catalogLoader } from "../pages/CaseCatalog";
import { loader as caseDetailsLoader } from "../pages/cases/CaseDetails";
import {
  action as claimAction,
  loader as claimLoader,
} from "../pages/cases/Claim";
import { action as respondAction } from "../pages/cases/Respond";
import { action as documentAction } from "../pages/documents/AddDocument";
import { action as stakeholderAction } from "../pages/stakeholders/AddStakeholder";
import { action as eventAction } from "../pages/events/AddEvent";

import { action as newCourtAction } from "../pages/courts/AddNewCourt";

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
        path: "catalog",
        element: <CaseCatalog />,
        loader: catalogLoader,
      },
      {
        path: "user",
        element: <UserLayout />,
        loader: userLayoutLoader,
        children: [
          { index: true, element: <Overview /> },
          {
            path: "edit-details",
            element: <EditUserDetails />,
            action: editUserDetailsAction,
          },
          {
            path: "change-password",
            element: <ChangeUserPassword />,
            action: changePasswordAction,
          },
          {
            path: "cases",
            element: <Cases />,
            children: [
              {
                index: true,
                element: <MyCases />,
                // loader: browseLoader,
                // action: browseAction,
              },
              {
                path: "claim",
                element: <Claim />,
                loader: claimLoader,
                action: claimAction,
              },
              {
                path: "respond",
                element: <Respond />,
                action: respondAction,
              },
              {
                path: ":caseID",
                children: [
                  {
                    index: true,
                    element: <CaseDetails />,
                    loader: caseDetailsLoader,
                  },
                  {
                    path: "docments",
                    element: <AddDocument />,
                    action: documentAction,
                  },
                  {
                    path: "stakeholders/:partyId",
                    element: <AddStakeholder />,
                    action: stakeholderAction,
                  },
                  {
                    path: "events",
                    element: <AddEvent />,
                    action: eventAction,
                  },
                ],
              },
            ],
          },
          {
            path: "courts",
            element: <Courts />,
            children: [
              { index: true, element: <BrowseCourts /> },
              {
                path: "add-new",
                element: <AddNewCourt />,
                action: newCourtAction,
              },
              {
                path: ":courtID",
                children: [
                  // { path: "edit", element: <CourtEditForm /> }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;