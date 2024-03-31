import { Router } from "express";
import documentsController from "../controllers/documents.controller.js";
import { upload } from "../middlewares/multer.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", upload, permissionsMiddleWare, documentsController.createDocument)
router.get("/:id", permissionsMiddleWare, documentsController.getDocumentById)
router.get("/party/:id", permissionsMiddleWare, documentsController.getDocumentByPartyId)
router.get("/case/:id", permissionsMiddleWare, documentsController.getDocumentByCaseId)
router.get("/user/:id", permissionsMiddleWare, documentsController.getDocumentByUserId)
router.patch("/", permissionsMiddleWare, documentsController.updateDocumentTitle)
router.get("/download/:documentId", permissionsMiddleWare, documentsController.downloadDocument)