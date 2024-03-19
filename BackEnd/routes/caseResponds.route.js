import { Router } from "express";
import caseRespondController from "../controllers/caseResponds.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, caseRespondController.createCaseRespond);
router.get("/", permissionsMiddleWare, caseRespondController.getAllCaseRespond);
router.patch("/review", permissionsMiddleWare, caseRespondController.reviewCaseRespond);
