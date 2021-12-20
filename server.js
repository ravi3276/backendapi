import express from "express";
import  mongoose  from "mongoose";
import studentRoute from "./api/routes/student.js";
import courseRoute from "./api/routes/course.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
const url='mongodb+srv://ravi:Raviteja10@cluster0.ax9pg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url,
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


app.use((req, res) => {
    res.status(404).json({ error: 'Bad URL request'})
})
app.listen(port,() => {
    console.log(" listening port " + port);
})