# College Complaint Web App (MERN)

A minimal, resume-ready MERN project with:
- JWT auth (student/admin)
- Complaint CRUD with file upload
- Student dashboard + Admin dashboard
- Filters & status updates

## Quick Start

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Backend starts at `http://localhost:5000`.

### 2) Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:5173` (Vite).

> Frontend uses `VITE_API_URL` env (optional). By default it calls `http://localhost:5000`.

### Create an Admin
Register normally, then in MongoDB update the user document's `role` to `"admin"` (or temporarily send `role: "admin"` in register request).

### Tech Stack
- React + Vite + React Router
- Node + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Multer for uploads (local storage)

### Notes
- Uploads are served from `/uploads` in backend. Files are saved to `backend/uploads`.
- For production, replace local uploads with S3 or Cloudinary.
