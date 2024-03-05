import { Router } from "express";
import caseController from "../controllers/cases.controller";

const router = Router();

router.post("/", caseController.createCase);
router.get("/", caseController.getCases);
router.get("/:id", caseController.getCaseById);
router.patch("/", caseController.updateCase);
router.patch("/status", caseController.updateCaseStatus);

export default router;