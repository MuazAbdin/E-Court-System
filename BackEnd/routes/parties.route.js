import { Router } from "express";
import partiesController from "../controllers/parties.controller";

const router = Router();

router.post("/", partiesController.createParty);
router.get("/:id", partiesController.getPartyById);
router.get("/:caseId", partiesController.getPartyByCaseId);
router.patch("/", partiesController.updateParty);
router.delete("/", partiesController.deleteParty);

export default router;