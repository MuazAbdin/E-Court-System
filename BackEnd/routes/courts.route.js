import { Router } from "express";
import courtsController from "../controllers/courts.controller.js";
import { permissionsMiddleWare } from "../middlewares/userPermissions.middleware.js";

export const router = Router();

router.post("/", permissionsMiddleWare, courtsController.createCourt);
router.get("/", permissionsMiddleWare, courtsController.getAllCourts);
router.get("/:id", permissionsMiddleWare, courtsController.getCourtById);
router.put("/", permissionsMiddleWare, courtsController.updateCourt);
router.patch("/add-judge", permissionsMiddleWare, courtsController.addJudge)
router.delete("/remove-judge", permissionsMiddleWare, courtsController.removeJudge)
