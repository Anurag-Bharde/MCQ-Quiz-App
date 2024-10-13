const express=require('express');
const {UserSchema}=require('../Db');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const JWTSECRET=process.env.JWT_Secret


const UserRouter=express.Router()


   UserRouter.post("/register",async(req,res)=>{
    try{
        
        const {Username,Email,Password,role}=req.body
          const finder=await UserSchema.findOne({Email:Email})
          if(finder){
                return res.status(411).json({mdg:"User Already Exists"})
              }

              const hashedPassword=await bcrypt.hash(Password,10)
            const dbuser=await UserSchema.create({
                username:Username,
                Email:Email,
                Password:hashedPassword,
                role:role
            })
            const UserId=dbuser._id.toString()

const token = jwt.sign({ id: UserId, role: role, username: dbuser.username }, JWTSECRET, { expiresIn: '1h' });
            
            res.cookie("token", token,{httpOnly:true,secure:true,sameSite:'none'});
            return res.json(token);
        }catch(err){
            console.log(err)
            return res.status(500).json({msg: "Interal server error"})
        }
        
    })
    

    UserRouter.post("/login",async(req,res)=>{
        try{
            const {Email,Password}=req.body;
           
            const finder=await UserSchema.findOne({Email:Email})
            if(!finder){
                return res.status(411).json({msg:"Enter credentials correctly"});
            }

            const isMatch = await bcrypt.compare(Password, finder.Password);
            if (!isMatch) {
                return res.status(411).json({ msg: "Incorrect credentials" });
            }
            

        const token = jwt.sign({ id: finder._id, role: finder.role, username: finder.username }, JWTSECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });

            return res.status(200).json({msg:'Logged in! '});
         }catch(err){
            console.log(err);
            res.status(500).json({msg: "Internal Server Error",err})
        }
    })

    UserRouter.post("/logout",(req,res)=>{
        res.clearCookie("token");
        res.json({message: "Logged Out!"});
    })

module.exports= UserRouter
