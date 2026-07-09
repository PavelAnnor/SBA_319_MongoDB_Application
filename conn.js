import "dotenv/config";
import mongoose from "mongoose";

export default async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected!"); 
    } catch (error) {
        console.log(error)  
    }
  

}
