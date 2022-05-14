const { Restaurant_Schema } = require("./restaurants-model");
const mongoose = require("mongoose");

const Restaurant_Pullreq_Schema = new mongoose.Schema(
  {
    object_id: {
      type: String,
      immutable: true,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    suggested_data: Restaurant_Schema,
    number_of_voters: {
      type:{username:String},
      required: true,
    },
    active: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = {
  Restaurant_Pullreq: Restaurant_Pullreq_Schema,
};
