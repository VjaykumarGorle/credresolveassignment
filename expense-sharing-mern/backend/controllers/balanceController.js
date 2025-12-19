const Balance = require("../models/Balance");


const simplifyBalances = async () => {
  const balances = await Balance.find();

  const net = {};

  balances.forEach(b => {
    net[b.from] = (net[b.from] || 0) - b.amount;
    net[b.to] = (net[b.to] || 0) + b.amount;
  });

  const debtors = [];
  const creditors = [];

  Object.keys(net).forEach(user => {
    if (net[user] < 0) debtors.push({ user, amount: -net[user] });
    if (net[user] > 0) creditors.push({ user, amount: net[user] });
  });

  await Balance.deleteMany({});

  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const min = Math.min(debtors[i].amount, creditors[j].amount);

    await Balance.create({
      from: debtors[i].user,
      to: creditors[j].user,
      amount: min
    });

    debtors[i].amount -= min;
    creditors[j].amount -= min;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }
};

//  Get balances (simplified)
exports.getBalances = async (req, res) => {
  await simplifyBalances();
  const balances = await Balance.find();
  res.json(balances);
};

//  Settle dues
exports.settleBalance = async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const balance = await Balance.findOne({ from, to });

  if (!balance) {
    return res.status(404).json({ message: "Balance not found" });
  }

  if (amount >= balance.amount) {
    await Balance.deleteOne({ from, to });
  } else {
    balance.amount -= amount;
    await balance.save();
  }

  res.json({ message: "Settlement successful" });
};
