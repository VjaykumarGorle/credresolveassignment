const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number
});

module.exports = mongoose.model("Balance", balanceSchema);
