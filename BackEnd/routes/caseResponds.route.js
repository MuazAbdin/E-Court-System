import { Router } from "express";
import caseRespondController from "../controllers/caseResponds.controller.js";

export const router = Router();

router.post("/", caseRespondController.createCaseRespond);
router.get("/", caseRespondController.getAllCaseRespond);
router.patch("/review", caseRespondController.reviewCaseRespond);
