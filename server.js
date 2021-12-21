import express from "express";
import  mongoose  from "mongoose";
import studentRoute from "./api/routes/student.js";
import courseRoute from "./api/routes/course.js";
import bodyParser from "body-parser";
import user from "./api/routes/user.js";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.url);
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.url,
{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(() => {console.log("mongoose conected");})
.catch(() => {console.log("mongoose error")})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true })) 
app.use('/student',studentRoute)
app.use('/course',courseRoute)
app.use('/user',user)


app.use((req, res) => {
    res.status(404).json({ error: 'Bad URL request'})
})
app.listen(port,() => {
    console.log(" listening port " + port);
})