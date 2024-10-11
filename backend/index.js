const express=require("express");
const app=express();
const bodyparser=require('body-parser');
app.use(express.json());


app.use(bodyparser.json());
app.use("User/SIgnin",UserRouter);



