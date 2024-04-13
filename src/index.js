import dotenv from "dotenv"
import connectDB from "./db/index.js";

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
dotenv.config({
    path:'./env'
})

connectDB()



/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants";

//Type 1 to db connection
import express from "express";
const app = express()
( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error)=> {
            console.log("Error: ",error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening  on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()
*/