const { default: mongoose } = require("mongoose");
var {Restaurant} = require("../models/restaurants-model");
module.exports = {
  postRes: function (req, res) {
    let rest = Restaurant ({
      RestaurantName:req.body.name,
      menu:req.body.menu,
      category:req.body.category,
      contact: req.body.contact,
      delivers:req.body.delivers,
      timestamps: { createdAt: "created_at" }
      
    })
    
    Restaurant.insertMany([rest])
    .then( data => res.status(201).json({'msg':'successfully added','data':data}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
};
