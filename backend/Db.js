const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
require("dotenv").config()

const database_Url=process.env.mongoose_Key

mongoose.connect(database_Url)

const UserSchemas=new mongoose.Schema({
    username:{
        type:String,
        required: true,
        minlength:3,
        maxlength:30,
        unique:true
    },
    Email:{
        type:String,
        required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    Password:{
      type:String,
      required:true,
      minlength:4
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{
    timestamps:true
})



const UserSchema=mongoose.model('User_Details',UserSchemas);

module.exports={
    UserSchema
}