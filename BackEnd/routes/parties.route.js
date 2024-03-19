import { Router } from "express";
import partiesController from "../controllers/parties.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, partiesController.createParty);
router.get("/:id", permissionsMiddleWare, partiesController.getPartyById);
router.get("/case/:caseId", permissionsMiddleWare, partiesController.getPartyByCaseId);
router.patch("/", permissionsMiddleWare, partiesController.updateParty);
router.delete("/", permissionsMiddleWare, partiesController.deleteParty);
