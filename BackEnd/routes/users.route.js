import { Router } from "express";
import userController from "../controllers/users.controller";

const router = Router();

router.get("/judges", userController.getJudges);
router.get("/lawyers", userController.getLawyers);
router.get("/", userController.getUsers);
router.put("/", userController.updateAllUserData);
router.patch("/", userController.updateUser);

export default router;