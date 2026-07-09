import express from "express"
import connectDB from "./conn.js"



const app = express();
const PORT = 3000;

app.use(express.json())

app.listen(PORT,()=>{
    connectDB();
    console.log("Server Listening....")
})