
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
        const newQuiz= await QuizSchema.create({
            title,
            questions,
            createdBy: req.user.id
        })
        res.status(201).json(newQuiz);
    }catch(err){
        res.status(500).json({msg:"Internal server error",err})
    }
})

QuizRoute.get('/mcqs',async(req,res)=>{
    try{
        const quizes=await QuizRoute.find().populate('createdBy','username');
        res.status(200).json(quizes);
    }catch(err){
        res.status(500).json({msg:"Internal server error",err})
    }
})

QuizRoute.get('quizes/:id',async(req,res)=>{
    try{
        const quizes=await QuizSchema.findById(req.params.id);
        if(!quiz){
            return res.status(400).json({msg:"Quiz not found"});
        }
        res.status(200).json(quizes)
    }catch(err){
        res.status(500).json({msg:"Internal server error",err})
    }
})

QuizRoute.post('/quiz/:id/submit')

module.exports=QuizRoute