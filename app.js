const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersController = require("./controllers/users-controller");
const restaurantController = require("./controllers/restaurants-controller");
const restaurantsPullreqController = require("./controllers/restaurants-pullreq-controller");
const app = express();
const port = 5000;

//mandatory global middleware
app.use(cors());
app.use(express.json());
app.use("/apiv1/auth", require("./routes/users-routes"));
app.get("/apiv1/restaurants/:id", restaurantController.getIdRes);
app.get("/apiv1/restaurants/chooseRes",restaurantController.chooseRes);
app.get("/apiv1/restaurants/", restaurantController.getRes);
app.get("/apiv1/pullreq/", restaurantsPullreqController.getPullReq);
app.get("/apiv1/pullreq/:id", restaurantsPullreqController.getIdPullReq);
app.use(usersController.verfiyAuth)
app.use("/apiv1/restaurants", require("./routes/restaurants-routes"));
app.use("/apiv1/pullreq", require("./routes/restaurants-pullreq-routes"));

//hello there
app.get("/",(req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
