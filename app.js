const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersController = require("./controllers/users-controller");
const app = express();
const port = 5000;

//mandatory global middleware
app.use(cors());
app.use(express.json());
app.use("/apiv1/auth", require("./routes/users-routes"));
app.use(usersController.verfiyAuth)
app.use("/apiv1/restaurants", require("./routes/restaurants-routes"));

//hello there
app.get("/",(req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
