const mongoose= require("mongoose")


const postSchema= mongoose.Schema({
    section:{type:String,trim:true,lowercase:true, required:true},
    text:{type:String},
    isFile:{type:Boolean,trim:true, required:true},
    files:{type:Array},
    like:{type:Number,default:0},
    dislikes:{type:Number,default:0},
    created:{type:Date,default:Date.now()}
})

const Posts = mongoose.model("Posts", postSchema)

module.exports=Posts;