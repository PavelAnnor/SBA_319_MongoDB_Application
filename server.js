//IMPORTING KEY MODULES
import express from "express"

//IMPORTING FUNCTION TO CONNECT TO DB
import connectDB from "./conn.js"

//ROUTE IMPORTS
import playerRoutes from "./routes/playerRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"


const app = express();
const PORT = 3000;

//MIDDLEWARE + ROUTERS
app.use(express.json())
app.use("/players",playerRoutes)
app.use("/teams",teamRoutes)




//Error catching middleware 
app.use((err,req,res,next)=>{
    console.log(err)
})
app.listen(PORT,()=>{
    connectDB();
    console.log("Server Listening....")
})