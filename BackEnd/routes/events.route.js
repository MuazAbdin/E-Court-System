import { Router } from "express";
import eventsController from "../controllers/events.controller.js";

export const router = Router();

router.post("/", eventsController.createEvent);
router.get("/upcoming", eventsController.getUpcomingEvents);
router.get("/case/:caseId", eventsController.getEventsByCaseId);
router.get("/:id", eventsController.getEventById);
router.patch("/", eventsController.updateEvent);
router.delete("/", eventsController.deleteEvent);
