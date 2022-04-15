const { default: mongoose } = require("mongoose");
var crudModel = require("../models/crud-model");
module.exports = {
  fetchCrud: function (req, res) {
    const data = crudModel.fetchCrud();
    res.json(data);
  },
};
