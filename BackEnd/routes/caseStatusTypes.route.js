import { Router } from "express";
import caseStatusTypesController from "../controllers/caseStatusTypes.controller";

const router = Router();

router.post("/", caseStatusTypesController.createCaseStatusType);
router.get("/", caseStatusTypesController.getAllCaseStatusTypes);
router.put("/", caseStatusTypesController.updateCaseStatusType);
router.delete("/", caseStatusTypesController.deleteCaseStatusType);

export default router;