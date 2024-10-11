const express=require("express");
const app=express();
const cookieParser=require('cookie-parser')
const bodyparser=require('body-parser');
const UserRouter=require("./Routes/UserInf")


app.use(express.json());
app.use(cookieParser())
app.use(bodyparser.json());

app.use("/User",UserRouter);


app.listen(3000, () => {
    console.log("Server running on port 3000");
  });