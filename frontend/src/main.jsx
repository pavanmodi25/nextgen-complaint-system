import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import NewComplaint from "./pages/NewComplaint.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/new" element={<NewComplaint />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
