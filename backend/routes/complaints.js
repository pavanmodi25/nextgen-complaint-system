import express from "express";
import multer from "multer";
import path from "path";
import Complaint from "../models/Complaint.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post("/", auth, upload.single("attachment"), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const complaint = await Complaint.create({
      title, description, category,
      attachmentUrl,
      createdBy: req.user.id
    });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/mine", auth, async (req, res) => {
  try {
    const list = await Complaint.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, requireRole("admin"), async (req, res) => {
  try {
    const { status, category, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };
    const list = await Complaint.find(filter).populate("createdBy", "name email").sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/status", auth, requireRole("admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Pending", "In Review", "Resolved"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    const updated = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
