const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

//mandatory global middleware
app.use(cors());
app.use(express.json());

//hello there
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
