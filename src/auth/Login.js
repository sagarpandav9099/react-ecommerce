import React, { useState } from "react";
import { loginUser } from "./authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(credentials);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/profile");
    } else {
      setMsg(res.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />
      <button type="submit">Login</button>
      <p>{msg}</p>
    </form>
  );
};

export default Login;
