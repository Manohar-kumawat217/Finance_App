import mongoose from "mongoose";

function connectToDB(){
    mongoose.connect(process.env.DB_URL).then(() =>{
        console.log("Connected to DB");
    }).catch((error) =>{
        console.log("Error while connecting to db -> ",error);
    })
}

export default connectToDB;