import { Router } from "express";
import userTypesController from "../controllers/userTypes.controller";

const router = Router();

router.post("/", userTypesController.createUserType);
router.get("/", userTypesController.getAllUserTypes);
router.put("/", userTypesController.updateUserType);
router.delete("/", userTypesController.deleteUserType);

export default router;