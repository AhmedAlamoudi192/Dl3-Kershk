const mongoose = require("mongoose");

const Users_Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      immutable: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    API_Key: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = {
  User: Users_Schema,
};
