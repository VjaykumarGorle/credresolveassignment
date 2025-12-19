const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/", controller.createUser);
router.get("/", controller.getUsers);

module.exports = router;
