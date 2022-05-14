const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../models/index-models");
module.exports = {
  postRegister: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    if (confirmPassword == undefined) {
      res.json({ err: "you must confirm your password" });
    }
    if (password !== confirmPassword) {
      res.json({ err: "passwords must match" });
    }
    crypto.pbkdf2(
      password,
      process.env.SALT_SECRET,
      310000,
      32,
      "sha256",
      (err, pass) => {
        if (err) {
          res.json({ err: err });
        }
        let user = User({
          username: username,
          password: pass.toString("hex"),
          API_Key: jwt.sign({ data: username }, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
          }),
        });

        User.insertMany([user])
          .then((data) =>
            res
              .status(201)
              .json({ msg: "successfully added", API_KEY: data.API_Key })
          )
          .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
      }
    );
  },
  postLogin: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user_id = await User.exists({ username: username });
    //look for the user in the database
    if (user_id != undefined) {
      const DBUser = await User.findById(user_id._id);
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
          if (DBUser.password != hashedPassword.toString("hex")) {
            res.json({
              message: "Incorrect username or password.",
            });
          }
          // if all is good update the jwt token and send it back
          const new_key = jwt.sign(
            { data: username },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );
          User.findByIdAndUpdate(user_id, { API_key: new_key });
          res.json({ msg: "user found", API_key: new_key });
        }
      );
    } else {
      res.json({
        message: "Incorrect username or password.",
      });
    }
  },
  verfiyAuth: async (req, res, next) => {
    const api_key = req.query.API_KEY;
    jwt.verify(api_key, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "user not verified" });
      } else {
        req.locals = decoded
        next();
      }
    });
  },
};
