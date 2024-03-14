import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");
const axios = require("axios");
const fs = require("fs");
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));

class PdfController {
	createPdf(req, res) {
		const { title, text } = req.body;

		try {
			doc.font("Helvetica-Bold").fontSize(25).text(`${title}`, 40, 50);
			doc.font("Helvetica").fontSize(14).text(`${text}`, 40, 120);
			doc.fontSize(17).text("", 40, 300);
			// doc.image("lebraLogo.png", {
			// 	fit: [150, 200],
			// 	align: "center",
			// 	valign: "center",
			// });
			doc.save();
			doc.end();
			res.send("success")
		} catch (error) {
			res.send(error)
			console.log(error);
		}
	}
}

const pdfController = new PdfController();
export default pdfController;
