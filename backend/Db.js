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



const questionSchema=new mongoose.Schema({
    questionText:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true,
        validDate:arrayLimit
    },
    correctAnswer:{
        type:String,
        required:true
    }
});

function arrayLimit(val){
    return val.length===4;
}

const QuizSchemaa= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    questions:[questionSchema],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserSchemas',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const UserSchema=mongoose.model('User_Details',UserSchemas);
const QuizSchema=mongoose.model('Quiz Schema',QuizSchemaa);

module.exports={
    UserSchema,
    QuizSchema
}