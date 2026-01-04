const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/items", require("./routes/itemRoutes"));
app.use("/bill", require("./routes/billRoutes")); 
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});



