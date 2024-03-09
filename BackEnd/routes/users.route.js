import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { dbConfig } from "../config.js";

export const router = Router();
router.get("/event-types", userController.getEventTypes);
router.get("/case-status-types", userController.getCaseStatusTypes);
router.get("/user-types", userController.getUserTypes); 
router.get("/judges", userController.getJudges);
router.get("/lawyers", userController.getLawyers);
router.get("/", userController.getUsers);
router.put("/", userController.updateAllUserData);
router.patch("/", userController.updateUser);

export default router;


