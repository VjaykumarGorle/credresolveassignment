const router = require("express").Router();
const controller = require("../controllers/balanceController");

router.get("/", controller.getBalances);
router.post("/settle", controller.settleBalance);

module.exports = router;
