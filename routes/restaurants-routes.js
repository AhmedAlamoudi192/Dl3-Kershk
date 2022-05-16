const restaurantController = require("../controllers/restaurants-controller");
const pullReqController = require("../controllers/restaurants-pullreq-controller");
const router = require("express").Router();

router.post("/",pullReqController.postPullReq ,restaurantController.postRes);
router.put("/:id",pullReqController.putPullReq,restaurantController.putRes);
router.delete("/:id",pullReqController.deletePullReq,restaurantController.deleteRes);
module.exports=router
