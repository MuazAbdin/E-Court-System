import { Router } from "express";
import userController from "../controllers/users.controller.js";

export const router = Router();

router.get("/user", userController.getUser);
router.get("/judges", userController.getJudges);
router.get("/lawyers", userController.getLawyers);
router.get("/", userController.getUsers);
router.put("/", userController.updateAllUserData);
router.patch("/", userController.updateUser);
router.patch("/password", userController.changePassword);
