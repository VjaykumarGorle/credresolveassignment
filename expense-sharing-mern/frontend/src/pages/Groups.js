import { useState } from "react";
import api from "../api";

export default function Groups() {
  const [groupName, setGroupName] = useState("");

  const createGroup = async () => {
    if (!groupName) {
      alert("Enter group name");
      return;
    }

    await api.post("/groups", {
      name: groupName,
      members: []
    });

    alert("Group created");
    setGroupName("");
  };

  return (
    <div>
      <h3>Create Group</h3>

      <input
        placeholder="Group Name"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
      />

      <button onClick={createGroup}>Create Group</button>
    </div>
  );
}
