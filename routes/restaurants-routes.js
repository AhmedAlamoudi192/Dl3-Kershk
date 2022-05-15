const restaurantController = require("../controllers/restaurants-controller");
const router = require("express").Router();

router.post("/", restaurantController.postRes);
router.put("/:id",restaurantController.putRes);
router.delete("/:id",restaurantController.deleteRes);
module.exports=router
