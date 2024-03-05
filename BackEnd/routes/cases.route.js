import { Router } from "express";
import casesController from "../controllers/cases.controller";

const router = Router();

router.post("/", casesController.createCase);
router.get("/", casesController.getCases);
router.get("/:id", casesController.getCaseById);
router.patch("/", casesController.updateCase);
router.patch("/status", casesController.updateCaseStatus);

export default router;