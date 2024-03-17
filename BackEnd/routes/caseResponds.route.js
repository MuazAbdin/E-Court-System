import { Router } from "express";
import casesController from "../controllers/cases.controller.js";

export const router = Router();

router.post("/", casesController.createCase);
