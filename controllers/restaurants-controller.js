const  {Restaurant} = require("../models/index-models");
module.exports = {
  postRes: function (req, res) {
    let rest = Restaurant ({
      RestaurantName:req.body.RestaurantName,
      menu:req.body.menu,
      category:req.body.category,
      contact: req.body.contact,
      delivers:req.body.delivers,
      rating:req.body.rating,
      aveRating:req.body.aveRating,
      numberOfVoters:req.body.numberOfVoters,
      timestamps: { createdAt: "created_at" }
      
    })
    
    Restaurant.insertMany([rest])
    .then( data => res.status(201).json({'msg':'successfully added','data':data}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
  getRes: function (req, res) {
    const check = req.query.query
    Restaurant.find()
    .then( data => res.status(200).json({'data':data,'searchFor':check}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
  getIdRes: async function (req, res) {
    const id = req.params.id
    await Restaurant.findById(id)
    .then( data => res.status(200).json({'data':data}))
    .catch( err => res.status(404).json({"msg: ": "ERROR: document not found"}))
  },
  
};
