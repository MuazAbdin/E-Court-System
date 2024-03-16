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
  EditCase,
} from "../pages";

import { loader as userLayoutLoader } from "../pages/UserLayout";

import { action as authAction } from "../pages/Authentication";
// import { action as courtAction } from "../pages/CourtForm";
// import { action as partyCreation } from "../pages/PartyForm";
// import { action as stakeholderCreation } from "../pages/StakeholderForm";
// import { action as eventCreation } from "../pages/EventForm";

import { action as editUserDetailsAction } from "../pages/userProfile/EditUserDetails";
import { loader as catalogLoader } from "../pages/CaseCatalog";

import {
  action as browseAction,
  loader as browseLoader,
} from "../pages/cases/BrowseCases";
import { loader as caseDetailsLoader } from "../pages/cases/CaseDetails";
import {
  action as newCaseAction,
  loader as newCaseLoader,
} from "../pages/cases/AddNewCase";
import { action as newCourtAction } from "../pages/courts/AddNewCourt";
import { action as changePasswordAction } from "../pages/userProfile/ChangeUserPassword";
import ViewCase from "../pages/ViewCase";
import { EventForm, PartyForm, StakeholderForm } from "../components";
import CaseDetails from "../pages/cases/CaseDetails";
import StyledPartyForm from "../assets/stylingWrappers/PartyForm";

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
                element: <BrowseCases />,
                loader: browseLoader,
                action: browseAction,
              },
              {
                path: "add-new",
                element: <AddNewCase />,
                loader: newCaseLoader,
                action: newCaseAction,
              },
              {
                path: "edit",
                element: <EditCase />,
                // action: newCaseAction,
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
        ],
      },
    ],
  },
]);

export default router;
