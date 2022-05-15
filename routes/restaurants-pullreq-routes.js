const pullReqController = require("../controllers/restaurants-pullreq-controller");
const router = require("express").Router();

router.post("/", pullReqController.postPullReq);
router.delete("/:id", pullReqController.deletePullReq);
router.put("/:id", pullReqController.putPullReq);

module.exports = router;
