import { Router } from "express";
import pdfController from "../controllers/pdf.controller.js";
export const router = Router();

router.post("/", pdfController.createPdf);


