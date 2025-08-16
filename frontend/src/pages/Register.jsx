import React, { useState } from "react";
import "./Register.css";

import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || "Registration failed");
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: "24px auto" }}>
      <h3>Register</h3>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <div><label>Name</label><br/><input value={name} onChange={e=>setName(e.target.value)} required /></div>
      <div><label>Email</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required /></div>
      <div><label>Password</label><br/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required /></div>
      <div>
        <label>Role</label><br/>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: 12 }}>Create account</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
