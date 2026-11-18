import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import {router} from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import{bookingRouter} from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

dotenv.config();

const app = express();
//1st middleware
//express .json
app.use(express.json({limit :"100mb"}));


//2nd middleware
//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}));

//3rd middleware
//cookie parser
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))

const PORT = process.env.PORT;

//one test route 
app.get("/",(req,res)=>{
    res.send("homelyhub server is running.i am perfect and you?")
})

app.use("/api/v1/rent/user",router);
app.use("/api/v1/rent/listing" , propertyRouter)
app.use("/api/v1/rent/user/booking" , bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)

connectDB();

app.listen(PORT,()=>{
    console.log(`APP is running on port no : ${PORT}`);
})

