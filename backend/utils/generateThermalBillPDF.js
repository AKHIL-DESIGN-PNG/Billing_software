const PDFDocument = require("pdfkit");

module.exports = function generateThermalBillPDF(res, bill) {
  // 58mm thermal ≈ 164 points width
  const doc = new PDFDocument({
    size: [164, 600],
    margins: { top: 10, bottom: 10, left: 10, right: 10 }
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "inline; filename=thermal-bill.pdf"
  );

  doc.pipe(res);

  // Shop Header
  doc.fontSize(10).text("AKHIL STORE", { align: "center" });
  doc.fontSize(8).text("Kirana & General", { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(7).text("--------------------------------");

  doc.text(`Date: ${new Date().toLocaleString()}`);
  doc.moveDown(0.5);

  doc.text("--------------------------------");
  doc.text("Item        Qty   Amt");
  doc.text("--------------------------------");

  bill.items.forEach((item) => {
    const name = item.name.substring(0, 10).padEnd(10, " ");
    const qty = String(item.qty).padStart(3, " ");
    const amt = String(item.total).padStart(5, " ");

    doc.text(`${name} ${qty} ${amt}`);
  });

  doc.text("--------------------------------");
  doc.fontSize(8).text(
    `TOTAL       ${bill.grandTotal}`,
    { align: "right" }
  );

  doc.moveDown(1);
  doc.fontSize(7).text("Thank You 🙏", { align: "center" });
  doc.text("Visit Again", { align: "center" });

  doc.end();
};
