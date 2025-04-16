const express= require("express");
require("dotenv").config();
const app= express();
const cors = require("cors")
const PORT= process.env.PORT;
const connectToDatabase = require('./configs/mongoose.js')
const apex= require("./routes/apex.js")

connectToDatabase()
app.use(cors())
app.use(express.json())
app.use("/",apex)

app.listen(PORT,()=>{
    console.log("Listening.....")
})

//localhost:3000/

//STEP 1:basic post storage and retrieavl for text
//STP 2:basic post storage and retreval for images