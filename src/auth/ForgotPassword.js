import React, { useState } from "react";
import { forgotPassword } from "./authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    setMsg(res.message || "Check your email for reset link");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Reset Link</button>
      <p>{msg}</p>
    </form>
  );
};

export default ForgotPassword;
