import { Router } from "express";
import documentsController from "../controllers/documents.controller.js";

export const router = Router();

router.post("/", documentsController.createDocument)
router.get("/:id", documentsController.getDocumentById)
router.get("/:partyId", documentsController.getDocumentByPartyId)
router.get("/:caseId", documentsController.getDocumentByCaseId)
router.get("/:userId", documentsController.getDocumentByUserId)
router.patch("/", documentsController.updateDocumentTitle)
