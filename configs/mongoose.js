const mongoose= require("mongoose")



const connectToDatabase=async()=>{
    try{
        mongoose.connect(process.env.MONGOOSE)
        console.log("Database connected")
    }catch(e){
        console.log("Issue connecting to the database")
    }
}

module.exports=connectToDatabase;