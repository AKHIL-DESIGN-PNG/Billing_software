const PDFDocument = require("pdfkit");

module.exports = function generateBillPDF(res, bill) {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "inline; filename=bill.pdf"
  );

  doc.pipe(res);

  doc.fontSize(20).text("Billing Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`);
  doc.moveDown();

  doc.text("--------------------------------------------------");

  bill.items.forEach((item) => {
    doc.text(
      `${item.name} | ₹${item.price} x ${item.qty} = ₹${item.total}`
    );
  });

  doc.text("--------------------------------------------------");
  doc.moveDown();

  doc.fontSize(14).text(`Grand Total: ₹${bill.grandTotal}`, {
    align: "right"
  });

  doc.end();
};
