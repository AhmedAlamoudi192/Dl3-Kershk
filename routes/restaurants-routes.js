const restaurantController = require("../controllers/restaurants-controller");
const router = require("express").Router();

router.post("/", restaurantController.postRes);
router.put("/:id",restaurantController.putRes);
router.delete("/:id",restaurantController.deleteRes);
router.post("/vote/:id",restaurantController.postVote);
router.delete("/vote/:id",restaurantController.deleteVote);
module.exports=router
