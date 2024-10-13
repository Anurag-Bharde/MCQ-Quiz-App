
const express=require('express');
const {QuizSchema}=require('../Db');
const {ResultSchema}=require('../Db')
const jwt=require('jsonwebtoken')
const QuizRoute=express.Router();
const JWTSECRET=process.env.JWT_Secret

const verifyToken=(req,res,next)=>{
    const token = req.cookies ? req.cookies.token : null;
        if(!token){
        return res.status(403).json({msg:"Access Denied"});
    }
    try{
        const decoded=jwt.verify(token,JWTSECRET);
        req.user=decoded;
        next()
    }catch(err){
        return res.status(401).json({msg:"Unauthorized: Invalid token"})
    }
}


QuizRoute.post('/Mcq',verifyToken,async(req,res)=>{
    try{
        const {title,questions}=req.body
        
        const newQuiz= await QuizSchema.create({
            title,
            questions,
            createdBy: req.user.id
        })
        res.status(201).json({msg:"done"});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
    }
})

QuizRoute.get('/Mcqs',async(req,res)=>{
    try{
        
        const quizes=await QuizSchema.find().select('title createdAt');
        res.status(200).json(quizes);
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
    }
})

QuizRoute.get('/Mcqs/:id',async(req,res)=>{
    try{
        const quizes=await QuizSchema.findById(req.params.id).select('-questions.correctAnswer');
        if(!quizes){
            console.log(12)
            return res.status(400).json({msg:"Quiz not found"});
        }
        res.status(200).json(quizes)
    }catch(err){
        res.status(500).json({msg:"Internal server error",err})
    }
})

QuizRoute.post('/quiz/:id/submit', verifyToken, async(req,res)=>{
    try{
        const {answer}=req.body;
        const quiz=await QuizRoute.findById(req.params.id);
        if(!quiz){
            return res.status(404).json({msg:"QUiz not found"});
        }
        let score=0;
        quiz.questions.forEach(question =>{
            if(answer[question._id]===question.correctAnswer){
                score++;
            }
        })

        const result = await Result.create({
            userId: req.user.id,
            username: req.user.username,
            quizId: quiz._id,
            quizTitle: quiz.title,
            score,
            totalQuestions: quiz.questions.length
        });
        res.status(200).json({score, totalQuestions:quiz.questions.length})
    }catch(err){
          res.status(500).json({msg:"Internal server Error",err})
    }
})

QuizRoute.get('/results', verifyToken, async(req,res)=>{
  try{
    const results = await Result.find({ userId: req.user.id }).select('-__v').sort({ date: -1 });
    res.status(200).json(results);
}catch(err){
    res.status(500).json({msg:"Internal SErver error",err})
}
})

module.exports=QuizRoute