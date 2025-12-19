import "./App.css";
import { useState } from "react";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import AddExpense from "./pages/AddExpense";
import Balances from "./pages/Balances";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app-container">
      <h1 className="app-title">Expense Sharing Application</h1>

      <div className="card">
        <Users />
      </div>

      <div className="card">
        <Groups />
      </div>

      <div className="card">
        <AddExpense onExpenseAdded={() => setRefresh(!refresh)} />
      </div>

      <div className="card">
        <Balances refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
