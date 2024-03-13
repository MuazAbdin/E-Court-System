import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Authentication,
  UserLayout,
  EditUserDetails,
  ChangeUserPassword,
  Overview,
  Cases,
  BrowseCases,
  AddNewCase,
  BrowseCourts,
  AddNewCourt,
  Courts,
  LegalEntities,
  Parties,
  BrowseParties,
  AddNewParty,
  Stackholders,
  BrowseStackholders,
  AddNewStackholder,
  Guest,
} from "../pages";

import { loader as userLayoutLoader } from "../pages/UserLayout";

import { action as authAction } from "../pages/Authentication";
// import { action as courtAction } from "../pages/CourtForm";
// import { action as partyCreation } from "../pages/PartyForm";
// import { action as stakeholderCreation } from "../pages/StakeholderForm";
// import { action as eventCreation } from "../pages/EventForm";

import { action as editUserDetailsAction } from "../pages/userProfile/EditUserDetails";
import {
  action as browseAction,
  loader as browseLoader,
} from "../pages/cases/BrowseCases";
import { loader as caseDetailsLoader } from "../pages/cases/CaseDetails";
import { action as newCaseAction } from "../pages/cases/AddNewCase";
import { action as newCourtAction } from "../pages/courts/AddNewCourt";
import { action as changePasswordAction } from "../pages/userProfile/ChangeUserPassword";
import ViewCase from "../pages/ViewCase";
import { EventForm, PartyForm, StakeholderForm } from "../components";
import CaseDetails from "../pages/cases/CaseDetails";

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
        path: "guest",
        element: <Guest />,
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
                element: <BrowseCases />,
                loader: browseLoader,
                action: browseAction,
              },
              {
                path: "add-new",
                element: <AddNewCase />,
                action: newCaseAction,
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
                    path: "party",
                    // element: ,
                    children: [
                      { path: "add-new", element: <PartyForm /> },
                      {
                        path: ":partyId",
                        // element: ,
                        children: [
                          // { index: true, element: <ViewParty />},
                          // { path: "edit", element: <PartyEditForm />},
                          {
                            path: "stakeholder",
                            children: [
                              { path: "add-new", element: <StakeholderForm /> },
                              {
                                path: ":stakeholderId",
                                children: [
                                  // { path: "edit", element: <EditStakeholderForm /> }
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    path: "event",
                    children: [
                      // { index: true, element: <BrowseEvenets /> },
                      { path: "add-new", element: <EventForm /> },
                      {
                        path: ":eventID",
                        children: [
                          // { path: "edit", element: <EventEditForm /> }
                        ],
                      },
                    ],
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
          {
            path: "legal-entities",
            element: <LegalEntities />,
            children: [
              // { index: true, element: <Parties /> },
              {
                path: "parties",
                element: <Parties />,
                children: [
                  // { index: true, element: <BrowseParties /> },
                  // { path: "add-new", element: <AddNewParty /> },
                  { index: true, element: <AddNewParty /> },
                ],
              },
              {
                path: "stackholders",
                element: <Stackholders />,
                children: [
                  { index: true, element: <AddNewStackholder /> },
                  // { index: true, element: <BrowseStackholders /> },
                  // { path: "add-new", element: <AddNewStackholder /> },
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
