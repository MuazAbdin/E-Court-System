import { Router } from "express";
import eventTypesController from "../controllers/eventTypes.controller.js";

export const router = Router();

router.post("/", eventTypesController.createEventType);
router.get("/", eventTypesController.getAllEventType);
router.put("/", eventTypesController.updateEventType);
router.delete("/", eventTypesController.deleteEventType);
