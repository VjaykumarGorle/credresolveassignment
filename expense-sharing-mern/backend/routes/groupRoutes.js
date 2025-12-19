const router = require("express").Router();
const controller = require("../controllers/groupController");

router.post("/", controller.createGroup);

module.exports = router;
