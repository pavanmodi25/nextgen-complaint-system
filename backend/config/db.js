import mongoose from "mongoose";

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   if (!uri) {
//     console.error("MONGO_URI not set in .env");
//     process.exit(1);
//   }
//   try {
//     await mongoose.connect(uri, { dbName: "college_complaints" });
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected");
  }catch{
    console.error("MongoDB connection error");
  }
}
export default connectDB;
