import "./NewComplaint.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NewComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    if (file) fd.append("attachment", file);
    const res = await fetch(`${API}/api/complaints`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.message || "Failed to submit");
    navigate("/student");
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 480, margin: "24px auto" }}>
      <h3>New Complaint</h3>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <div><label>Title</label><br/><input value={title} onChange={e=>setTitle(e.target.value)} required /></div>
      <div><label>Description</label><br/><textarea rows="4" value={description} onChange={e=>setDescription(e.target.value)} required /></div>
      <div>
        <label>Category</label><br/>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Hostel</option>
          <option>Mess</option>
          <option>Academics</option>
          <option>Library</option>
          <option>Other</option>
        </select>
      </div>
      <div><label>Attachment (optional)</label><br/><input type="file" onChange={e=>setFile(e.target.files[0])} /></div>
      <button type="submit" style={{ marginTop: 12 }}>Submit</button>
    </form>
  );
}
