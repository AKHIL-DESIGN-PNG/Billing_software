const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  category: String
});

module.exports = mongoose.model("Item", itemSchema);
