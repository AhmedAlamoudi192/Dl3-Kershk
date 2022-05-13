const usersController = require("../controllers/users-controller");
const router = require("express").Router();

router.post("/login", usersController.postLogin);
router.post("/register", usersController.postRegister);

module.exports = router;
