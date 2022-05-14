const restaurantController = require("../controllers/restaurants-controller");
const router = require("express").Router();

router.post("/add", restaurantController.postRes);
router.get("/get", restaurantController.getRes);
router.get("/get/:id", restaurantController.getIdRes);

module.exports = router;
