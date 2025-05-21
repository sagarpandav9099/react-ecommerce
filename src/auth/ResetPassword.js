import React, { useState } from "react";
import { resetPassword } from "./authService";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { token } = useParams(); // /reset-password/:token

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword({ token, password });
    setMsg(res.message || "Password reset successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      <p>{msg}</p>
    </form>
  );
};

export default ResetPassword;
