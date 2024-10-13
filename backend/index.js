const express=require("express");
const app=express();
const cookieParser=require('cookie-parser')
const bodyparser=require('body-parser');
const UserRouter=require("./Routes/UserInf")
const QuizRoute=require("./Routes/Quiz")
const cors=require("cors");
const PORT= process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyparser.json());

app.use("/User",UserRouter);
app.use("/Quiz",QuizRoute);


app.listen(PORT, () => {
    console.log("Server running on port "+ PORT    );
  });