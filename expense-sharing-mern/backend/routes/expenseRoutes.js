const router = require("express").Router();
const controller = require("../controllers/expenseController");

router.post("/", controller.addExpense);

module.exports = router;
