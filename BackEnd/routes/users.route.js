import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.get("/user", permissionsMiddleWare, userController.getUser);
router.get("/judges", permissionsMiddleWare, userController.getJudges);
router.get("/lawyers", permissionsMiddleWare, userController.getLawyers);
router.get("/", permissionsMiddleWare, userController.getUsers);
router.put("/", permissionsMiddleWare, userController.updateAllUserData);
router.patch("/", permissionsMiddleWare, userController.updateUser);
router.patch("/password", permissionsMiddleWare, userController.changePassword);
