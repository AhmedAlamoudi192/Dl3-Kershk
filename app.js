const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
mongoose.connect(
  "mongodb://localhost:27017/Dl3-Kershk"
);

mongoose.connection.on("error", (err) => {
  console.log("failed to connect to db " + err);
});
mongoose.connection.on("connected", () => {
  console.log("connected to db successfully");
});

//mandatory global middleware
app.use(cors());
app.use(express.json());

//hello there
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
