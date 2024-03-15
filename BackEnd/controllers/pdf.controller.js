import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");
const axios = require("axios");
const fs = require("fs");
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));

class PdfController {
	async createPdf(req, res) {
		const content = req.body;

		try {
			doc.font("Helvetica-Bold").fontSize(29).text(`${content.title}`, 280, 30);
			for(let i = 70, j=0 ; j<content.sections.length; i+=50, j++){
				doc.font("Helvetica-Bold").fontSize(17).text(`${content.sections[j].sectionTite}`, 55, i);
				doc.font("Helvetica").fontSize(13).text(`${content.sections[j].sectionParagraph}`, 65, i+18);
				doc.save();	
			}
			// doc.image(logo.Response, {
			// 	fit: [150, 200],
			// 	align: "center",
			// 	valign: "center",
			// });
			doc.end();
			res.send("pdf file created successfully")
		} catch (error) {
			res.send(error)
		}
	}
}

const pdfController = new PdfController();
export default pdfController;
