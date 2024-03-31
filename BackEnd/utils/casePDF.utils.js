import dayjs from 'dayjs';

export default function buildCasePDF(pdfDoc, caseData) {
  // A4 595.28 x 841.89 (portrait) (about width sizes)
  pdfDoc.text(`Last Updated: ${dayjs(caseData.updatedAt).format("DD MMM YYYY - HH:mm")}`, 
              50, 50, { align: "right" });

  pdfDoc.font("fonts/Ubuntu-Bold.ttf").text("Case Number: ", 50, 80);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf").text(caseData.caseNumber, 140, 80);
  pdfDoc.font("fonts/Ubuntu-Bold.ttf").text("Status: ", 420, 80);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf").text(caseData.status, 470, 80);


  pdfDoc.fontSize(15).font("fonts/Ubuntu-Bold.ttf")
        .text(`${caseData.court.name} - ${caseData.court.city}`, 50, 130, 
              { align: "center"} )
        .moveDown();

  pdfDoc.fontSize(15).font("fonts/Ubuntu-Regular.ttf")
        .text(`Before Judge: ${`${caseData.judge?.firstName || ""} ${caseData.judge?.lastName || ""}`}`, { align: "center" })
        .moveDown();

  pdfDoc.fontSize(13).font("fonts/Ubuntu-Bold.ttf")
        .text(caseData.title, { align: "center" })
        .moveDown();

  pdfDoc.fontSize(13).font("fonts/Ubuntu-Regular.ttf")
        .text(caseData.description, { align: "left", indent: 10 })
        .moveDown();
  
  pdfDoc.fontSize(13).font("fonts/Ubuntu-Bold.ttf")
      .text("Case Parties:", { align: "left" })
      .moveDown();

  pdfDoc.font("fonts/Ubuntu-Regular.ttf").text("Claimant", 190, 280);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf").text("Respondent", 380, 280);
  pdfDoc.moveTo(50, 300).lineTo(545, 300).stroke();
  pdfDoc.moveDown();

  pdfDoc.text("Client", 80, 310);
  pdfDoc.text(`${caseData.parties[0]?.client.idNumber || ""}`, 180, 310);
  pdfDoc.text(`${caseData.parties[1]?.client.idNumber || ""}`, 370, 310);

  pdfDoc.text(`${caseData.parties[0]?.client.firstName || ""} ${caseData.parties[0]?.client.lastName || ""}`, 180, 330);
  pdfDoc.text(`${caseData.parties[1]?.client.firstName || ""} ${caseData.parties[1]?.client.lastName || ""}`, 370, 330);

  pdfDoc.text(`${caseData.parties[0]?.client.phoneNumber || ""}`, 180, 350);
  pdfDoc.text(`${caseData.parties[1]?.client.phoneNumber || ""}`, 370, 350);

  pdfDoc.text(`${caseData.parties[0]?.client.email || ""}`, 180, 370);
  pdfDoc.text(`${caseData.parties[1]?.client.email || ""}`, 370, 370);

  pdfDoc.text("Lawyer", 80, 390);
  pdfDoc.text(`${caseData.parties[0]?.lawyer.firstName || ""} ${caseData.parties[0]?.lawyer.lastName || ""}`, 180, 390);
  pdfDoc.text(`${caseData.parties[1]?.lawyer?.firstName || ""} ${caseData.parties[1]?.lawyer?.lastName || ""}`, 370, 390);
  pdfDoc.text("", 50, 400).moveDown(2);

  pdfDoc.font("fonts/Ubuntu-Bold.ttf")
    .text("Claimant Lawyer Notes:", { align: "left" })
    .moveDown(0.75);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf")
    .text(`${caseData.claimantLawyerNotes}`, { align: "left", indent: 20 })
    .moveDown();

  pdfDoc.font("fonts/Ubuntu-Bold.ttf")
    .text("Respondent Lawyer Notes:", { align: "left" })
    .moveDown(0.75);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf")
    .text(`${caseData.respondentLawyerNotes}`, { align: "left", indent: 20 })
    .moveDown();

  pdfDoc.font("fonts/Ubuntu-Bold.ttf")
    .text("Judge Lawyer Notes:", { align: "left" })
    .moveDown(0.75);
  pdfDoc.font("fonts/Ubuntu-Regular.ttf")
    .text(`${caseData.judgeNotes}`, { align: "left", indent: 20 })
    .moveDown();
  
}