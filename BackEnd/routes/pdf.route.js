import { Router } from "express";
import pdfController from "../controllers/pdf.controller.js";
export const router = Router();


router.post("/", pdfController.createPdf);
router.get("/pdf", function(req,res){
    res.send("yeas")
});

