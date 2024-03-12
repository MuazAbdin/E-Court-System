import { Router } from "express";
import documentsController from "../controllers/documents.controller.js";

export const router = Router();

router.post("/", documentsController.createDocument)
router.get("/:id", documentsController.getDocumentById)
router.get("/party/:id", documentsController.getDocumentByPartyId)
router.get("/case/:id", documentsController.getDocumentByCaseId)
router.get("/user/:id", documentsController.getDocumentByUserId)
router.patch("/", documentsController.updateDocumentTitle)
