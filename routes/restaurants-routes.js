const restaurantController = require("../controllers/restaurants-controller");
const router = require("express").Router();

router.post("/add", restaurantController.postRes);
router.get("/get", restaurantController.getRes);
router.get("/get/:id", restaurantController.getIdRes);
router.put("/put",restaurantController.putRes);
router.delete("/delete",restaurantController.deleteRes);
router.get("/chooseRes",restaurantController.chooseRes);
module.exports=router
