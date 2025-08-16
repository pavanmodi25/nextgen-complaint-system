import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css"; // import CSS

export default function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <h2 className="logo">NextGen Complaint System</h2>
        <nav className="nav-links">
          {!user && (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn">Register</Link>
            </>
          )}
          {user?.role === "student" && (
            <>
              <Link to="/student" className="nav-btn">My Complaints</Link>
              <Link to="/student/new" className="nav-btn primary-btn">New Complaint</Link>
            </>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className="nav-btn">Admin Dashboard</Link>
          )}
          {user && (
            <button onClick={logout} className="logout-btn">Logout</button>
          )}
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
