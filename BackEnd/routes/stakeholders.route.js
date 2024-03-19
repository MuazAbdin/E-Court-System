import { Router } from "express";
import stakeholdersController from "../controllers/stakeholders.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, stakeholdersController.createStakeholder);
router.get("/:id", permissionsMiddleWare, stakeholdersController.getStakeholderById);
router.get("/:partyId", permissionsMiddleWare, stakeholdersController.getStakeholderByPartyId);
router.put("/", permissionsMiddleWare, stakeholdersController.updateStakeholder);
router.delete("/", permissionsMiddleWare, stakeholdersController.deleteStakeholder);
