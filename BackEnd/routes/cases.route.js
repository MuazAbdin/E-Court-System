import { Router } from "express";
import casesController from "../controllers/cases.controller.js";

export const router = Router();

router.post("/", casesController.createCase);
router.post("/file-a-case", casesController.fileACase);
router.get("/", casesController.getCases);
router.get("/pending", casesController.getPendingCases);
router.get("/user", casesController.getUserCases);
router.get("/:id", casesController.getCaseById);
router.patch("/", casesController.updateCase);
router.patch("/status", casesController.updateCaseStatus);
router.patch("/resolve-pending", casesController.resolvePendingCase);
