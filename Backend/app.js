// here we write our express app

import dotenv from "dotenv";
import express from "express";
//create express app
const app = express();
import cors from "cors";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

//load environment variables
dotenv.config();

//new learning
import helmet from "helmet";
import morgan from "morgan";

// database connection function
    connectToDB();
// Middleware setup
app.use(cors());//Enable cors
app.use(helmet())//Security headers
app.use(morgan("dev"));//HTTP request logger
app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({extended:true}));


//sample route
app.get("/",(req,res) =>{
    res.send("Welcome to home API testing success")
})

app.use("/finance/user",userRoutes);

export default app;