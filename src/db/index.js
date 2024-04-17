import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import {app} from "../app.js"

const connectDB = async() => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectInstance.connection.host}`)
    } catch (error) {
        console.log("mongoos connection error",error);
        process.exit(1)
    }
}


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
    app.on("Error", (error)=> {
        console.log("Server Listen Error:",error);
        throw error
    })
})
.catch((error)=> {
    console.log("MongoDB Connection Failed! :",error);
})


export default connectDB;