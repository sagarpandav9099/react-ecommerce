import { useState } from "react";
import { api } from "./api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api("/register/", "POST", form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Registered successfully!");
    } else {
      alert("Error: " + JSON.stringify(res));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <input
        name="password2"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}
