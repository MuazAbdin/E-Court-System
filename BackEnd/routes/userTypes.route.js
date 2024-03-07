import { Router } from "express";
import userTypesController from "../controllers/userTypes.controller.js";

export const router = Router();

router.post("/", userTypesController.createUserType);
router.get("/", userTypesController.getAllUserTypes);
router.put("/", userTypesController.updateUserType);
router.delete("/", userTypesController.deleteUserType);
