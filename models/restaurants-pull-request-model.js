const { Restaurant } = require("./restaurants-model");
const mongoose = require("mongoose");

const Restaurant_Pullreq_Schema = new mongoose.Schema(
  {
    object_id: {
      type: String,
      immutable: true,
    },
    method: {
      type: String,
      required: true,
    },
    suggested_data: Restaurant,
    number_of_voters: {
      type:[String],
      required: true,
    },
    active: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = {
  Restaurant_Pullreq: Restaurant_Pullreq_Schema,
};
