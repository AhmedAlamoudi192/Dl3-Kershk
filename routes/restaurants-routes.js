const restaurantController= require('../controllers/restaurants-controller');
const router = require("express").Router();

router.post("/add",restaurantController.postRes);

module.exports=router