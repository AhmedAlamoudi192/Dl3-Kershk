const { Restaurant } = require("../models/index-models");
module.exports = {
  postRes: function (req, res) {
    let rest = Restaurant({
      RestaurantName: req.body.RestaurantName,
      menu: req.body.menu,
      category: req.body.category,
      contact: req.body.contact,
      delivers: req.body.delivers,
      timestamps: { createdAt: "created_at" },
    });

    Restaurant.insertMany([rest])
      .then((data) =>
        res.status(201).json({ msg: "successfully added", data: data })
      )
      .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
  },
  getRes: function (req, res) {
    const searchFor = req.query.query
    searchFlag = searchFor !== undefined
    
    Restaurant.find(searchFlag?{suggested_data:{RestaurantName:searchFor}}:{})
    .then( data => res.status(200).json({'data':data,}))
    .catch( err => res.status(400).json({"msg: ": "ERROR","err":err }))
  },
  getIdRes: async function (req, res) {
    const id = req.params.id;
    await Restaurant.findById(id)
      .then((data) => res.status(200).json({ data: data }))
      .catch((err) =>
        res.status(404).json({ "msg: ": "ERROR: document not found" })
      );
  },

  putRes: function (req, res) {
    const id = req.params.id;
    let rest = Restaurant({
      RestaurantName: req.body.RestaurantName,
      menu: req.body.menu,
      category: req.body.category,
      contact: req.body.contact,
      delivers: req.body.delivers,
    });
    Restaurant.findByIdAndUpdate(id, rest).then((i) =>
      res
        .status(201)
        .json({ data: "successfully updated" })
        .catch((err) =>
          res.status(404).json({ "msg: ": "ERROR: document not found" })
        )
    );
  },
  postVote: function (req, res) {
    const id = req.params.id;
    const rest = {
      rating: { [req.locals.data]: 1 },
    };
    Restaurant.findByIdAndUpdate(id, rest, (err, i) => {
      if (i) {
        res.status(201).json({ data: "successfully voted" });
      }
      if (err) {
        res.status(404).json({ "msg: ": "ERROR: document not found"+err });
      }
    });
  },
  deleteVote: async function (req, res) {
    const id = req.params.id;
    const rating = await Restaurant.find({_id:id},'rating')
    const username = req.locals.data
    delete rating[username]
    let rest = {
      rating: rating,
    };
    Restaurant.findByIdAndUpdate(id, rest, (err, i) => {
      if (i) {
        res.status(201).json({ data: "successfully removed the vote" });
      }
      if (err) {
        res.status(404).json({ "msg: ": "ERROR: document not found"+err });
      }
    });
  },
  deleteRes: function (req, res) {
    const id = req.params.id;
    Restaurant.findByIdAndDelete(id)
      .then(() => res.status(200).json({ data: "Deleted" }))
      .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
  },
  chooseRes:function (req, res) {
    Restaurant.find()
      .then((data) => {
        let maxLimit = data.length-1;
        let rand = Math.floor(Math.random() *10% maxLimit);
        res.json({ "Data found: ": data[4] });
      })
      .catch((err) => res.json({ "Error: ": err }));
  },
};
