const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

/* ADD OR UPDATE ITEM */
router.post("/", async (req, res) => {
  const { name, price, quantity, category } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingItem = await Item.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") }
  });

  if (existingItem) {
    existingItem.quantity += Number(quantity);
    existingItem.price = price;
    existingItem.category = category;

    await existingItem.save();
    return res.json({ message: "Item updated", item: existingItem });
  }

  const newItem = await Item.create({
    name,
    price,
    quantity,
    category
  });

  res.json({ message: "Item added", item: newItem });
});
/* GET ALL ITEMS */
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
// SEARCH ITEMS
router.get("/search/:name", async (req, res) => {
  const name = req.params.name;

  const items = await Item.find({
    name: { $regex: name, $options: "i" }
  });

  res.json(items);
});
// DEDUCT STOCK
router.post("/deduct", async (req, res) => {
  const { name, quantity } = req.body;

  const item = await Item.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") }
  });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  item.quantity -= quantity;
  await item.save();

  res.json(item);
});

module.exports = router;