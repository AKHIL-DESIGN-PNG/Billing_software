const express = require("express");
const generateBillPDF = require("../utils/generateBillPDF");

const router = express.Router();

router.post("/generate", (req, res) => {
  const { items, grandTotal } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items" });
  }

  generateBillPDF(res, { items, grandTotal });
});
const generateThermalBillPDF = require("../utils/generateThermalBillPDF");

router.post("/generate-thermal", (req, res) => {
  const { items, grandTotal } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items" });
  }

  generateThermalBillPDF(res, { items, grandTotal });
});


module.exports = router;
