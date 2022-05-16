const { RestPullReq } = require("../models/index-models");
const { Restaurant } = require("../models/index-models");
module.exports = {
  postPullReq: function (req, res, next) {
    //check if there's a pull request already
    RestPullReq.find({
      'suggested_data.RestaurantName': req.body.RestaurantName,
      method: "create",
      active: true
    })
      .then(async (data) => {
        if (data[0].number_of_voters.length >= 10) {
          //change active and update it
          await RestPullReq.findByIdAndUpdate(data[0]._id.toString(), { active: false });
          next();
        } else {
          if (data[0].number_of_voters.includes(req.locals.data)) {
            res.json({ msg: "sorry, you already voted" });
          } else {
            let newArray = [...data[0].number_of_voters];
            newArray.push(req.locals.data);
            await RestPullReq.findByIdAndUpdate(data[0]._id.toString(), {
              number_of_voters: newArray,
            });
            res.json({ msg: "success, added your vote" });
          }
        }
      })
      .catch(() => {
        let request = RestPullReq({
          method: "create",
          suggested_data: Restaurant({
            RestaurantName: req.body.RestaurantName,
            menu: req.body.menu,
            category: req.body.category,
            contact: req.body.contact,
            delivers: req.body.delivers,
          }),
          number_of_voters: [req.locals.data],
          active: true,
          timestamps: { createdAt: "created_at" },
        });

        RestPullReq.insertMany([request])
          .then((data) =>
            res
              .status(201)
              .json({ msg: "successfully created a pull request", data: data })
          )
          .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
      });
  },
  getPullReq: function (req, res) {
    const searchFor = req.query.query;
    searchFlag = searchFor !== undefined;
    RestPullReq.find(
      searchFlag ? { suggested_data: { RestaurantName: searchFor } } : {}
    )
      .then((data) => res.status(200).json({ data: data }))
      .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
  },
  getIdPullReq: async function (req, res) {
    const id = req.params.id;
    await RestPullReq.findById(id)
      .then((data) => res.status(200).json({ data: data }))
      .catch((err) =>
        res.status(404).json({ "msg: ": "ERROR: document not found" })
      );
  },

  putPullReq: function (req, res, next) {
    const rest_id = req.params.id;
    //check if there's a pull request already
    RestPullReq.find({
      'suggested_data.RestaurantName': req.body.RestaurantName,
      active: true,
      method: "update",
    })
      .then(async (data) => {
        if (data[0].number_of_voters.length >= 10) {
          //change active and update it
          await RestPullReq.findByIdAndUpdate(data[0]._id, { active: false });
          next();
        } else {
          if (data[0].number_of_voters.includes(req.locals.data)) {
            res.json({ msg: "sorry, you already voted" });
          } else {
            let newArray = [...data[0].number_of_voters];
            newArray.push(req.locals.data);
            await RestPullReq.findByIdAndUpdate(data[0]._id.toString(), {
              number_of_voters: newArray,
            });
            res.json({ msg: "success, added your vote" });
          }
        }
      })
      .catch(async () => {
        let request = RestPullReq({
          method: "update",
          suggested_data: Restaurant({
            RestaurantName: req.body.RestaurantName,
            menu: req.body.menu,
            category: req.body.category,
            contact: req.body.contact,
            delivers: req.body.delivers,
          }),
          number_of_voters: [req.locals.data],
          active: true,
          timestamps: { createdAt: "created_at" },
        });

        RestPullReq.insertMany([request])
          .then((data) =>
            res
              .status(201)
              .json({ msg: "successfully created a pull request", data: data })
          )
          .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
      });
  },
  deletePullReq: async function (req, res) {
    const target_rest = await Restaurant.findById(rest_id);
    //check if there's a pull request already
    RestPullReq.find({
      'suggested_data.RestaurantName': req.body.RestaurantName,
      active: true,
      method: "delete",
    })
      .then(async (data) => {
        if (data[0].number_of_voters.length >= 10) {
          //change active and update it
          await RestPullReq.findByIdAndUpdate(data[0]._id, { active: false });
          next();
        } else {
          if (data[0].number_of_voters.includes(req.locals.data)) {
            res.json({ msg: "sorry, you already voted" });
          } else {
            let newArray = [...data[0].number_of_voters];
            newArray.push(req.locals.data);
            await RestPullReq.findByIdAndUpdate(data[0]._id.toString(), {
              number_of_voters: newArray,
            });
            res.json({ msg: "success, added your vote" });
          }
        }
      })
      .catch(() => {
        let request = RestPullReq({
          method: "delete",
          suggested_data: Restaurant({
            RestaurantName: target_rest.RestaurantName,
            menu: target_rest.menu,
            category: target_rest.category,
            contact: target_rest.contact,
            delivers: target_rest.delivers,
          }),
          number_of_voters: [req.locals.data],
          active: true,
          timestamps: { createdAt: "created_at" },
        });

        RestPullReq.insertMany([request])
          .then((data) =>
            res
              .status(201)
              .json({ msg: "successfully created a pull request", data: data })
          )
          .catch((err) => res.status(400).json({ "msg: ": "ERROR", err: err }));
      });
  },
};
