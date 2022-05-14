const restaurantController = require("../controllers/restaurants-controller");
const router = require("express").Router();

router.post("/add", restaurantController.postRes);
router.put("/put/:id",restaurantController.putRes);
router.delete("/delete/:id",restaurantController.deleteRes);
module.exports=router
