import { useState } from "react";
import api from "../api";

export default function AddExpense({ onExpenseAdded }) {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");

  const [exact1, setExact1] = useState("");
  const [exact2, setExact2] = useState("");

  const [percent1, setPercent1] = useState("");
  const [percent2, setPercent2] = useState("");

  const addExpense = async () => {
    if (!paidBy || !amount || !user1 || !user2) {
      alert("Fill all required fields");
      return;
    }

    if (user1 === user2) {
      alert("Users must be different");
      return;
    }

    const total = Number(amount);
    let splits = [];

    //  EQUAL SPLIT
    if (splitType === "EQUAL") {
      const half = total / 2;

      if (user1 !== paidBy) splits.push({ user: user1, amount: half });
      if (user2 !== paidBy) splits.push({ user: user2, amount: half });
    }

    //  EXACT SPLIT
    if (splitType === "EXACT") {
      if (Number(exact1) + Number(exact2) !== total) {
        alert("Exact amounts must sum to total");
        return;
      }

      if (user1 !== paidBy) splits.push({ user: user1, amount: Number(exact1) });
      if (user2 !== paidBy) splits.push({ user: user2, amount: Number(exact2) });
    }

    //  PERCENTAGE SPLIT
    if (splitType === "PERCENT") {
      if (Number(percent1) + Number(percent2) !== 100) {
        alert("Percentages must sum to 100");
        return;
      }

      const amt1 = (total * Number(percent1)) / 100;
      const amt2 = (total * Number(percent2)) / 100;

      if (user1 !== paidBy) splits.push({ user: user1, amount: amt1 });
      if (user2 !== paidBy) splits.push({ user: user2, amount: amt2 });
    }

    try {
      await api.post("/expenses", {
        paidBy,
        amount: total,
        splitType,
        splits
      });

      alert("Expense added");

      if (onExpenseAdded) onExpenseAdded();

      // reset
      setPaidBy("");
      setAmount("");
      setUser1("");
      setUser2("");
      setExact1("");
      setExact2("");
      setPercent1("");
      setPercent2("");
    } catch (err) {
      alert("Error adding expense");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>

      <input placeholder="Paid By" value={paidBy} onChange={e => setPaidBy(e.target.value)} />
      <input type="number" placeholder="Total Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input placeholder="User 1" value={user1} onChange={e => setUser1(e.target.value)} />
      <input placeholder="User 2" value={user2} onChange={e => setUser2(e.target.value)} />

      <select value={splitType} onChange={e => setSplitType(e.target.value)}>
        <option value="EQUAL">Equal Split</option>
        <option value="EXACT">Exact Split</option>
        <option value="PERCENT">Percentage Split</option>
      </select>

      {splitType === "EXACT" && (
        <>
          <input type="number" placeholder="User1 Amount" value={exact1} onChange={e => setExact1(e.target.value)} />
          <input type="number" placeholder="User2 Amount" value={exact2} onChange={e => setExact2(e.target.value)} />
        </>
      )}

      {splitType === "PERCENT" && (
        <>
          <input type="number" placeholder="User1 %" value={percent1} onChange={e => setPercent1(e.target.value)} />
          <input type="number" placeholder="User2 %" value={percent2} onChange={e => setPercent2(e.target.value)} />
        </>
      )}

      <button onClick={addExpense}>Add Expense</button>
    </div>
  );
}
