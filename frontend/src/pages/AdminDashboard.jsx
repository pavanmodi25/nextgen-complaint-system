import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const token = localStorage.getItem("token");

  const load = async () => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (category) params.append("category", category);
    if (q) params.append("q", q);
    const res = await fetch(`${API}/api/complaints?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`${API}/api/complaints/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) load();
  };

  return (
    <div className="admin-dashboard">
      <h3>Admin Dashboard</h3>

      <div className="filter-bar">
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Review</option>
          <option>Resolved</option>
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Hostel</option>
          <option>Mess</option>
          <option>Academics</option>
          <option>Library</option>
          <option>Other</option>
        </select>
        <input
          placeholder="Search title..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button onClick={load}>Filter</button>
      </div>

      {!items.length && <p className="no-data">No complaints found.</p>}

      {items.map(c => (
        <div key={c._id} className="complaint-card">
          <div className="complaint-header">
            <div>
              <b>{c.title}</b> — <i>{c.category}</i>
              <div className="complaint-meta">
                By: {c.createdBy?.name} ({c.createdBy?.email})
              </div>
              <div>
                Status: <b>{c.status}</b>
              </div>
            </div>
            <div>
              <select
                value={c.status}
                onChange={e => updateStatus(c._id, e.target.value)}
                className="status-select"
              >
                <option>Pending</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <p className="complaint-description">{c.description}</p>

          {c.attachmentUrl && (
            <a
              href={`${API}${c.attachmentUrl}`}
              target="_blank"
              className="attachment-link"
              rel="noreferrer"
            >
              Attachment
            </a>
          )}

          <div className="complaint-time">
            {new Date(c.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
