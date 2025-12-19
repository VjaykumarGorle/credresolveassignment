import { useState } from "react";
import api from "../api";

export default function Users() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    if (!name || !email) {
      alert("Enter name and email");
      return;
    }

    await api.post("/users", { name, email });
    alert("User added");

    setName("");
    setEmail("");
  };

  return (
    <div>
      <h3>Add User</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>
    </div>
  );
}
