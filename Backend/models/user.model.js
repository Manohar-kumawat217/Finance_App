import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema( {
    userName:{
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[50,"Name cannot exceed 50 characters"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false,
    }
    },
    {timestamps: true}
)

// adding methods to the user schema
//generating auth token
userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"});
}

//comparing password
userSchema.methods.comparePassword = async function(enteredPassword,storedPassword){
    return await bcrypt.compare(enteredPassword,storedPassword);
}

//hashing password
userSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

//creating model
const userModel =  mongoose.model("user",userSchema);
//exporting model
export default userModel;