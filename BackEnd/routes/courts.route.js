import { Router } from "express";
import courtsController from "../controllers/courts.controller.js";

export const router = Router();

router.post("/", courtsController.createCourt);
router.get("/", courtsController.getAllCourts);
router.get("/:id", courtsController.getCourtById);
router.patch("/", courtsController.updateCourt);
router.patch("/add-judge", courtsController.addJudge)
router.delete("/remove-judge", courtsController.removeJudge)
