import { Router } from "express";
import casesController from "../controllers/cases.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, casesController.createCase);
router.post("/file-a-case", permissionsMiddleWare, casesController.fileACase);
router.get("/", permissionsMiddleWare, casesController.getCases);
router.get("/pending", permissionsMiddleWare, casesController.getPendingCases);
router.get("/user", permissionsMiddleWare, casesController.getUserCases);
router.get("/:id", permissionsMiddleWare, casesController.getCaseById);
router.patch("/", permissionsMiddleWare, casesController.updateCase);
router.patch("/status", permissionsMiddleWare, casesController.updateCaseStatus);
router.patch("/resolve-pending", permissionsMiddleWare, casesController.resolvePendingCase);
router.patch("/note", permissionsMiddleWare, casesController.updateNote);
