import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");
const axios = require("axios");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("output.pdf"));

doc.fontSize(25).text("Stack Holder details", 40, 100);

doc.image("aa.png", {
	fit: [250, 300],
	align: "center",
	valign: "center",
});

doc.save();

doc.end();
