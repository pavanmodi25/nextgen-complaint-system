import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StudentDashboard() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/api/complaints/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    })();
  }, []);

  return (
    <div className="student-dashboard">
      <h3>My Complaints</h3>
      {!items.length && <p className="no-complaints">No complaints yet. Create one from "New Complaint".</p>}
      {items.map(c => (
        <div key={c._id} className="complaint-card">
          <div className="complaint-title">{c.title}</div>
          <div className="complaint-category">{c.category}</div>
          <div className="complaint-status">Status: {c.status}</div>
          <p className="complaint-description">{c.description}</p>
          {c.attachmentUrl && (
            <a
              href={`${API}${c.attachmentUrl}`}
              target="_blank"
              className="complaint-attachment"
            >
              Attachment
            </a>
          )}
          <span className="complaint-date">{new Date(c.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
