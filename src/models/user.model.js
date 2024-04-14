import mongoose, { Schema } from "mongoose";  // means we are taking mongoos as well as we are extracting Schema from them.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new schema (
    {
        username: {
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index: true
        },
        email: {
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName: {
            type:String,
            require:true,
            trim:true,
            index: true,
        },
        avatar: {
            type: String,   //cloudinary url
            require:true
        },
        coverImage: {
            type: String    //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password : {
            type: String,
            require:[true,"password is required"]
        },
        refreshToken: {
            type:String
        }
    },

    {
        timestamps:true     //we will get created at and updated at from this fild autmatically
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt .hash(this.password,10) 
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username : this.username,
        fullName:this.fullName
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
}

export const User = mongoose.model("User",userSchema)