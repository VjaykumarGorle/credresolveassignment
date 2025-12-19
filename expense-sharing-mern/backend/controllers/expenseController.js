const Expense = require("../models/Expense");
const Balance = require("../models/Balance");

exports.addExpense = async (req, res) => {
  const { paidBy, splits } = req.body;

  await Expense.create(req.body);

  for (let split of splits) {
    if (split.user !== paidBy) {
      await Balance.findOneAndUpdate(
        { from: split.user, to: paidBy },
        { $inc: { amount: split.amount } },
        { upsert: true }
      );
    }
  }

  res.json({ message: "Expense added successfully" });
};
