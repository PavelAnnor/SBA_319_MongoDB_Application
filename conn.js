import "dotenv/config";
import mongoose from "mongoose";

export default async function connectDB() {
//   mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected!");
}
