const express = require("express");
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");
const app = express();
const port = 5000;

//mandatory global middleware
app.use(cors());
app.use(express.json());
app.use("/apiv1/restaurants", require("./routes/restaurants-routes"));
app.use("/apiv1/auth", require("./routes/users-routes"));

//authentication
function verify(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  if (username == "ahmed") {
    crypto.pbkdf2(
      password,
      process.env.SALT_SECRET,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          res.json({ err: err });
        }
        if (!crypto.timingSafeEqual(hashedPassword, hashedPassword)) {
          res.json({
            message: "Incorrect username or password.",
          });
        }
        res.locals.hashed = hashedPassword.toString("hex");
        res.locals.msg = "user found";
        next();
      }
    );
  } else {
    res.json({ message: "User Not Found" });
  }
}

//hello there
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", verify, (req, res) => {
  res.locals.success = 200;
  res.json(res.locals);
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.json(res.locals);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
