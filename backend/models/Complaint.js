import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Hostel", "Mess", "Academics", "Library", "Other"], default: "Other" },
  status: { type: String, enum: ["Pending", "In Review", "Resolved"], default: "Pending" },
  attachmentUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);
