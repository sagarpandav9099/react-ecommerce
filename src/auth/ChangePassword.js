import React, { useState } from "react";
import { updatePassword } from "./authService";

const ChangePassword = () => {
  const [data, setData] = useState({ old_password: "", new_password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await updatePassword(data, token);
    setMsg(res.message || "Password changed");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) => setData({ ...data, old_password: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setData({ ...data, new_password: e.target.value })}
      />
      <button type="submit">Change Password</button>
      <p>{msg}</p>
    </form>
  );
};

export default ChangePassword;
