const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/groups", require("./routes/groupRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));
app.use("/balances", require("./routes/balanceRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
