import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))    // we are going to acpet from req json who's limit 16kb
app.use(express.urlencoded({extended:true, limit:"16kb"}))   //urlencoded means we are going to acpet data throw url
app.use(express.static("public"))    // if i get any document from user then i will store that in public folder 
app.use(cookieParser())      // then we will able to do CRUD operation on cookie


// routes import
import userRouter from "./routes/user.route.js"  // we can import like this when export will default

// routes declaration
app.use("/api/v1/users", userRouter)


//  http://localhost:8080/api/v1/users/register

export { app } 