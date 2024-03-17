import { Router } from "express";
import partiesController from "../controllers/parties.controller.js";

export const router = Router();

router.post("/", partiesController.createParty);
router.get("/:id", partiesController.getPartyById);
router.get("/case/:caseId", partiesController.getPartyByCaseId);
router.patch("/", partiesController.updateParty);
router.delete("/", partiesController.deleteParty);
