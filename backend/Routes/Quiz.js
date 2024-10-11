
const express=require('express');
const {QuizSchema}=require('../Db');
const jwt=require('jsonwebtoken')
const QuizRoute=express.Router();
const JWTSECRET=process.env.JWT_Secret

const verifyToken=(req,res,next)=>{
    const token=req.cookie.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({msg:"Access Denied"});
    }
    try{
        const decoded=jwt.verify(token,JWTSECRET);
        req.user=decoded.id
        next()
    }catch(err){
        return res.status(401).json({msg:"Unauthorized: Invalid token"})
    }
}


QuizRoute.post('/Mcq',async(req,res)=>{
    try{
        const {title,questions}=req.body
    }
})


module.exports=QuizRoute