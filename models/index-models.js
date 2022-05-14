const mongoose = require("mongoose");
const { Restaurant } = require("./restaurants-model");
const { User } = require("./users-model");
const { Restaurant_Pullreq } = require("./restaurants-pull-request-model");
const database = mongoose.createConnection(
  "mongodb://localhost:27017/Dl3-Kershk"
);
database.on("error", (err) => {
  console.log("failed to connect to db " + err);
});
database.on("connected", () => {
  console.log("connected to db successfully");
});

module.exports = {
  Restaurant:database.model('Restaurant',Restaurant),
  User:database.model('User',User),
  RestPullReq:database.model('Restaurant_pull_requests',Restaurant_Pullreq),
};
