const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ownerName: String,
  shopName: String,
  phone: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
