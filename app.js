const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

//mandatory global middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/restaurants-routes"))

//hello there
app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
