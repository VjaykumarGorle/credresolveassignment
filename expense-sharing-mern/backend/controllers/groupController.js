const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  const group = await Group.create(req.body);
  res.json(group);
};
