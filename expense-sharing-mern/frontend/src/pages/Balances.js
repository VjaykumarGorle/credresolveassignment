import api from "../api";
import { useEffect, useState } from "react";

export default function Balances({ refresh }) {
  const [balances, setBalances] = useState([]);
  const [settleAmount, setSettleAmount] = useState({});

  const fetchBalances = () => {
    api.get("/balances").then(res => setBalances(res.data));
  };

  useEffect(() => {
    fetchBalances();
  }, [refresh]);

  const settle = async (from, to) => {
    const amount = Number(settleAmount[`${from}-${to}`]);

    if (!amount || amount <= 0) {
      alert("Enter valid settle amount");
      return;
    }

    await api.post("/balances/settle", {
      from,
      to,
      amount
    });

    alert("Settlement successful");

    setSettleAmount({});
    fetchBalances();
  };

  return (
    <div>
      <h3>Balances</h3>

      <ul className="balance-list">
        {balances.length === 0 && <li>No balances</li>}

        {balances.map((b, i) => (
          <li key={i}>
            {b.from} owes {b.to} ₹{b.amount}
            <br />

            <input
              type="number"
              placeholder="Settle amount"
              value={settleAmount[`${b.from}-${b.to}`] || ""}
              onChange={e =>
                setSettleAmount({
                  ...settleAmount,
                  [`${b.from}-${b.to}`]: e.target.value
                })
              }
            />

            <button onClick={() => settle(b.from, b.to)}>
              Settle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
