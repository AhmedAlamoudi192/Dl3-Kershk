const pullReqController = require("../controllers/restaurants-pullreq-controller");
const router = require("express").Router();

router.post("/post", pullReqController.postPullReq);
router.delete("/delete/:id", pullReqController.deletePullReq);
router.put("/put/:id", pullReqController.putPullReq);

module.exports = router;
