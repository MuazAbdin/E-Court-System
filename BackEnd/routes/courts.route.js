import { Router } from "express";
import courtsController from "../controllers/courts.controller";

const router = Router();

router.post("/", courtsController.createCourt);
router.get("/:id", courtsController.getCourtById);
router.patch("/", courtsController.updateCourt);

export default router;