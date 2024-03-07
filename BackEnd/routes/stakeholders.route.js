import { Router } from "express";
import stakeholdersController from "../controllers/stakeholders.controller.js";

export const router = Router();

router.post("/", stakeholdersController.createStakeholder);
router.get("/:id", stakeholdersController.getStakeholderById);
router.get("/:partyId", stakeholdersController.getStakeholderByPartyId);
router.put("/", stakeholdersController.updateStakeholder);
router.delete("/", stakeholdersController.deleteStakeholder);
