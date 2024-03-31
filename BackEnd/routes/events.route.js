import { Router } from "express";
import eventsController from "../controllers/events.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, eventsController.createEvent);
router.get("/upcoming", permissionsMiddleWare, eventsController.getUpcomingEvents);
router.get("/case/:caseId", permissionsMiddleWare, eventsController.getEventsByCaseId);
router.get("/:id", permissionsMiddleWare, eventsController.getEventById);
router.patch("/", permissionsMiddleWare, eventsController.updateEvent);
router.delete("/", permissionsMiddleWare, eventsController.deleteEvent);
