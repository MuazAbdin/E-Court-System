import { Router } from "express";
import courtsController from "../controllers/courts.controller.js";

export const router = Router();

router.post("/", courtsController.createCourt);
router.get("/:id", courtsController.getCourtById);
router.patch("/", courtsController.updateCourt);
router.patch("/judges", courtsController.addJudge)
router.patch("/judges/remove", courtsController.removeJudge)
