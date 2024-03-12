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
import { action as editUserDetailsAction } from "../pages/userProfile/EditUserDetails";
import { action as browseAction } from "../pages/cases/BrowseCases";
import { action as newCaseAction } from "../pages/cases/AddNewCase";
import { action as newCourtAction } from "../pages/courts/AddNewCourt";
import { action as changePasswordAction } from "../pages/userProfile/ChangeUserPassword";

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
              { index: true, element: <BrowseCases />, action: browseAction },
              // {
              //   path: ":caseID",
              //   element: <CaseDetails />,
              //   children: [
              //     { index: true, element: <Case /> },
              //     { path: "court", element: <Court /> },
              //     { path: "party", element: <Party /> },
              //     { path: "stackholder", element: <Stackholder /> },
              //   ],
              // },
              {
                path: "add-new",
                element: <AddNewCase />,
                action: newCaseAction,
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
