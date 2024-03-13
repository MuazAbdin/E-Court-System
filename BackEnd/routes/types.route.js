import { Router } from "express";
import userController from "../controllers/users.controller.js";
import eventsController from "../controllers/events.controller.js";
import casesController from "../controllers/cases.controller.js";

export const router = Router();

router.get("/user-types", userController.getUserTypes); 
router.get("/case-status-types", casesController.getCaseStatusTypes);
router.get("/event-types", eventsController.getEventTypes);
