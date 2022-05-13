const { jwt } = require("jsonwebtoken");
const { User } = require("../models/index-models");
const mongoose = require("mongoose");
module.exports = {
  postRegister: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let hashed = "";
    crypto.pbkdf2(
      password,
      process.env.SALT_SECRET,
      310000,
      32,
      "sha256",
      (err, pass) => (hashed = pass.toString("hex"))
    );
    let user = User({
      username: username,
      password: hashed,
      API_Key: jwt.sign(username, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      }),
    });

    User.insertMany([user])
      .then((data) =>
        res.status(201).json({ msg: "successfully added", data: data })
      )
      .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
  },
  postLogin: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //look for the user in the database
    if (username == "ahmed") {
      const API_Key = "key here";
      const hashedPass = "";
      crypto.pbkdf2(
        password,
        process.env.SALT_SECRET,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          // if an error occured
          if (err) {
            res.json({ err: err });
          }
          // if the password is incorrect
          if (hashedPass != hashedPassword.toString("hex")) {
            res.json({
              message: "Incorrect username or password.",
            });
          }
          res.json({ msg: "user found", API_Key: API_Key });
        }
      );
    } else {
      res.json({ message: "User Not Found" });
    }
  },
};
