const restaurantController= require('../controllers/restaurants-controller');
const router = require("express").Router();

router.get("/",restaurantController);