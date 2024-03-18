import { Router } from "express";
import documentsController from "../controllers/documents.controller.js";
import { upload } from "../middlewares/multer.js";

export const router = Router();

router.post("/", upload, documentsController.createDocument)
router.get("/:id", documentsController.getDocumentById)
router.get("/party/:id", documentsController.getDocumentByPartyId)
router.get("/case/:id", documentsController.getDocumentByCaseId)
router.get("/user/:id", documentsController.getDocumentByUserId)
router.patch("/", documentsController.updateDocumentTitle)
router.get("/download/:documentId", documentsController.downloadDocument)