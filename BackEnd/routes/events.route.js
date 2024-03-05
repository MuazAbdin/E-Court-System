import { Router } from "express";
import eventsController from "../controllers/events.controller";

const router = Router();

router.post("/", eventsController.createEvent);
router.get("/:caseId", eventsController.getEventsByCaseId);
router.get("/id", eventsController.getEventById);
router.patch("/", eventsController.updateEvent);
router.delete("/", eventsController.deleteEvent);

export default router;