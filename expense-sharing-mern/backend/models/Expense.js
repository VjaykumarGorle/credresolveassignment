const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  paidBy: String,
  amount: Number,
  splitType: String,
  splits: [
    {
      user: String,
      amount: Number
    }
  ]
});

module.exports = mongoose.model("Expense", expenseSchema);
