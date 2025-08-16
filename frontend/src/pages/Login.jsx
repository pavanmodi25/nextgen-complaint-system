import "./Login.css";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(data.user.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 380, margin: "24px auto" }}>
      <h3>Login</h3>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <div>
        <label>Email</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Password</label><br/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
      </div>
      <button type="submit" style={{ marginTop: 12 }}>Login</button>
      <p>New here? <Link to="/register">Register</Link></p>
      <div style={{ fontSize: 12, color: "#666" }}>
        {/* Tip: create an admin via register and set role to "admin" in database manually (or seed). */}
      </div>
    </form>
  );
}
