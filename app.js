const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersController = require("./controllers/users-controller");
const restaurantController = require("./controllers/restaurants-controller");
const restaurantsPullreqController = require("./controllers/restaurants-pullreq-controller");
const app = express();
const port = 5000;
//hello there
app.use('/', express.static('./out'))

//mandatory global middleware
app.use(cors());
app.use(express.json());
app.use("/apiv1/auth", require("./routes/users-routes"));
app.get("/apiv1/restaurants/chooseRes",restaurantController.chooseRes);
app.get("/apiv1/restaurants/:id", restaurantController.getIdRes);
app.get("/apiv1/restaurants/", restaurantController.getRes);
app.get("/apiv1/restaurants/chooseRes",restaurantController.chooseRes);
app.get("/apiv1/restaurants/:id", restaurantController.getIdRes);
app.get("/apiv1/pullreq/", restaurantsPullreqController.getPullReq);
app.get("/apiv1/pullreq/:id", restaurantsPullreqController.getIdPullReq);
app.use(usersController.verfiyAuth)
app.post("/apiv1/restaurants/vote/:id",restaurantController.postVote);
app.delete("/apiv1/restaurants/vote/:id",restaurantController.deleteVote);
app.use("/apiv1/pullreq", require("./routes/restaurants-pullreq-routes"));
// app.use(restaurantsPullreqController.postPullReq);
app.use("/apiv1/restaurants", require("./routes/restaurants-routes"));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
