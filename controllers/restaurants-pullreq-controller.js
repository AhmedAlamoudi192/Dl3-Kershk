const  {RestPullReq} = require("../models/index-models");
const  {Restaurant} = require("../models/index-models");
module.exports = {
  postPullReq: function (req, res) {
    let request = RestPullReq ({
        method: req.body.method,
          suggested_data: Restaurant({
            RestaurantName:req.body.suggested_data.RestaurantName,
            menu:req.body.suggested_data.menu,
            category:req.body.suggested_data.category,
            contact: req.body.suggested_data.contact,
            delivers:req.body.suggested_data.delivers,
          }),
          number_of_voters: [
            req.locals.data
          ],
          active: true,
      timestamps: { createdAt: "created_at" }
      
    })
    
    RestPullReq.insertMany([request])
    .then( data => res.status(201).json({'msg':'successfully added','data':data}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
  getPullReq: function(req, res) {
    const searchFor = req.query.query
    searchFlag = searchFor !== undefined
    RestPullReq.find(searchFlag?{suggested_data:{RestaurantName:searchFor}}:{})
    .then( data => res.status(200).json({'data':data,}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
  getIdPullReq: async function (req, res) {
    const id = req.params.id
    await RestPullReq.findById(id)
    .then( data => res.status(200).json({'data':data}))
    .catch( err => res.status(404).json({"msg: ": "ERROR: document not found"}))
  },
  
  
  putPullReq: function (req, res){
    const id = req.params.id
    let request = RestPullReq ({
        method: req.body.method,
          suggested_data: Restaurant({
            RestaurantName:req.body.suggested_data.RestaurantName,
            menu:req.body.suggested_data.menu,
            category:req.body.suggested_data.category,
            contact: req.body.suggested_data.contact,
            delivers:req.body.suggested_data.delivers,
          }),
          number_of_voters: [
            req.locals.data
          ],
          active: true,
      timestamps: { createdAt: "created_at" }
      
    })
    RestPullReq.findByIdAndUpdate(id,request)
  },
  deletePullReq: function (req, res){
    const id = req.params.id
    RestPullReq.findByIdAndDelete(id)
    .then( () => res.status(200).json({'data':"Deleted"}) )
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }) )

  },
};