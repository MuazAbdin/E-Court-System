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
  BrowseCourts,
  Court,
  AddNewCourt,
  Courts,
  MyCases,
  Claim,
  Respond,
  AddDocument,
  CaseDetails,
  AddStakeholder,
  AddEvent,
  RespondRequests,
  BrowseCases,
} from "../pages";

import { loader as userLayoutLoader } from "../pages/UserLayout";
import { loader as overviewLoader } from "../pages/userProfile/Overview";
import ReviewClaims, {
  loader as reviewClaimsLoader,
} from "../pages/cases/ReviewClaims";
import { loader as browseCourtsLoader } from "../pages/courts/BrowseCourts";
import { loader as courtLoader } from "../pages/courts/Court";

import { action as authAction } from "../pages/Authentication";

import { loader as myCasesLoader } from "../pages/cases/MyCases";
import { loader as browseCasesLoader } from "../pages/cases/BrowseCases";
import { loader as requestsLoader } from "../pages/cases/RespondRequests";

import { action as editUserDetailsAction } from "../pages/userProfile/EditUserDetails";
import { action as changePasswordAction } from "../pages/userProfile/ChangeUserPassword";

import {
  loader as caseDetailsLoader,
  action as caseDetailsAction,
} from "../pages/cases/CaseDetails";
import {
  action as claimAction,
  loader as claimLoader,
} from "../pages/cases/Claim";
import { action as respondAction } from "../pages/cases/Respond";
import { action as documentAction } from "../pages/documents/AddDocument";
import { action as stakeholderAction } from "../pages/stakeholders/AddStakeholder";
import { action as eventAction } from "../pages/events/AddEvent";
import { action as breakdownAction } from "../pages/userProfile/Overview";

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
        path: "user",
        element: <UserLayout />,
        loader: userLayoutLoader,
        children: [
          {
            index: true,
            element: <Overview />,
            loader: overviewLoader,
            action: breakdownAction,
          },
          {
            path: "courts/add-new",
            element: <AddNewCourt />,
            action: newCourtAction,
          },
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
                loader: myCasesLoader,
              },
              {
                path: "browse",
                element: <BrowseCases />,
                loader: browseCasesLoader,
              },
              {
                path: "claim",
                element: <Claim />,
                loader: claimLoader,
                action: claimAction,
              },
              {
                path: "pending",
                element: <ReviewClaims />,
                loader: reviewClaimsLoader,
              },
              {
                path: "respond",
                element: <Respond />,
                action: respondAction,
              },
              {
                path: "respond-requests",
                element: <RespondRequests />,
                loader: requestsLoader,
              },
              {
                path: ":caseID",
                children: [
                  {
                    index: true,
                    element: <CaseDetails />,
                    loader: caseDetailsLoader,
                    action: caseDetailsAction,
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
        ],
      },
      {
        path: "courts",
        // element: <Courts />,
        children: [
          {
            index: true,
            element: <BrowseCourts />,
            loader: browseCourtsLoader,
          },
          {
            path: ":courtId",
            element: <Court />,
            loader: courtLoader,
          },
        ],
      },
    ],
  },
]);

export default router;
